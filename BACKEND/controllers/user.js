const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const User = require('../models/user')
const EmailVerificationToken = require('../models/emailVerificationToken')
const PasswordResetToken = require('../models/passwordResetToken')
const { isValidObjectId } = require("mongoose")
const passwordResetToken = require("../models/passwordResetToken")

//using async await for saving the data to DB
exports.create = async (req, res) => {

    // console.log(req.body) //req deals with the frontend requesting , i.e. the data coming from frontend
    const { username, email, password } = req.body // destructuring to extract username, email, and received_password from the req.body object. It assumes that the request body contains these properties.

    //checking if the user email already exists
    const oldUserByEmail = await User.findOne({ email })
    //checking if the user email already exists
    const oldUserByUsername = await User.findOne({ username })

    if (oldUserByEmail) {
        return res.status(401).json({ error: "Email already exists!" })
    } else if (oldUserByUsername) {
        return res.status(401).json({ error: "Try different username!" })
    }
    const newUser = new User({ username: username, email: email, password: password }) //new instance of the User model with the extracted values
    //to save in newUser database
    await newUser.save()


    //NOW THE USER'S DATA IS IN OUR DB AND WE CAN PERFORM EMAIL VERIFICATION
    //Generating 6 digit OTP
    let OTP = ''
    for (let i = 0; i < 6; i++) {
        const randomVal = Math.round(Math.random() * 9)
        OTP += randomVal
    }

    //Saving OTP to DB
    const newEmailVerificationToken = new EmailVerificationToken({ ownerID: newUser._id, token: OTP }) //new instance of the emailVerificationToken model with the proper value
    await newEmailVerificationToken.save()

    //Sending OTP to user's email

    //1. Connecting with nodemailer using MailTrap
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASS
        }
    });
    //2. Enterting the data for sending the mail
    transport.sendMail({
        from: 'verification@popcornpal.in',
        to: newUser.email,
        subject: 'Your Verification OTP',
        html: `
            <h4>Your verification OTP is:</h4>
            <h1>${OTP}</h1>
            <h5>Happy Watching...❤️</h5>
        `
    })

    // res.json({user: req.body}) --> res deals with the response, i.e. the result the backend sends to frontend
    res.status(201).json({
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    })
}


//Verifying the user
exports.verifyEmail = async (req, res) => {
    const { userID, OTP } = req.body;

    //if the userID is not valid, then mongoDB will sent error
    if (!isValidObjectId(userID)) { return res.status(401).json({ error: 'Invalid User ID!' }) }

    //to check if the enter userID is in DB or not
    const user = await User.findById(userID)
    if (!user) { return res.status(404).json({ error: 'User not found!' }) }

    //to check if user is already verified
    if (user.isVerified) { return res.status(401).json({ error: 'User already Verified :)' }) }

    const token = await EmailVerificationToken.findOne({ ownerID: userID })
    if (!token) { return res.status(404).json({ error: 'Token not found!' }) }
    //comparing the token
    const isMatched = await token.compareToken(OTP)
    //if not matched
    if (!isMatched) { return res.status(401).json({ error: 'OTP does not match!' }) }

    //if matched
    user.isVerified = true;
    await user.save()

    await EmailVerificationToken.findByIdAndDelete(token._id)

    const jwtToken = jwt.sign({ userID: user._id }, process.env.SECRET_KEY)
    res.status(201).json({ user: { id: user._id, username: user.username, email: user.email, token: jwtToken }, message: 'Your Email has been Verified!' })


    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASS
        }
    });

    transport.sendMail({
        from: 'verification@popcornpal.in',
        to: user.email,
        subject: 'Welcome to PopcornPal!🍿',
        html: `
            <h2 style="color:Purple">Lights! Camera! Popcorn!</h2>
            <h4>Your email has been verified!</h4>
            <h5>Happy Watching...❤️</h5>
        `
    })

}


//For reseting the password
exports.forgetPassword = async (req, res) => {

    //checking if the user exists in our DB or not
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) { return res.status(404).json({ error: 'User not found!' }) }

    //if user has already requested for password reset
    const alreadyHasToken = await PasswordResetToken.findOne({ ownerID: user._id })
    if (alreadyHasToken) { return res.status(401).json({ error: 'Requests can be made only after a gap of 1 hour.' }) }

    //now to send a token for verifying the user to allow reset
    let token = ''
    for (let i = 0; i < 6; i++) {
        const randomVal = Math.round(Math.random() * 9)
        token += randomVal
    }
    //saving the token in our DB
    const newPasswordResetToken = await PasswordResetToken({ ownerID: user._id, token: token })
    await newPasswordResetToken.save()

    //sending a link via mail to user for reseting the password
    const resetPasswordURL = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASS
        }
    });

    transport.sendMail({
        from: 'security@popcornpal.in',
        to: user.email,
        subject: 'Your Password Reset Link',
        html: `
            <h4>Pal at your rescue💪⛑️</h4>
            <a href='${resetPasswordURL}'>Click here</a><span> to reset your password.</span>
        `
    })

    res.status(201).json({ message: 'Link sent to your mail!' })
}


//function to change the password in the DB
exports.resetPassword = async (req, res) => {
    const { newPassword, userID } = req.body
    const user = await User.findById(userID)

    //checking if new and old password are same
    const matched = await user.comparePassword(newPassword)
    if (matched) { return res.status(401).json({ error: 'New password cannot be same as the old one.' }) }

    //if not same then changing the password
    user.password = newPassword
    await user.save()

    //sending success mail to user
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASS
        }
    });

    transport.sendMail({
        from: 'security@popcornpal.in',
        to: user.email,
        subject: 'Password Reset Successful.',
        html: `
            <h4>Your password has been reset.</h4>
            <h5>Happy Watching...❤️</h5>
        `
    })

    //displaying success message on frontend
    res.status(201).json({ message: 'Password reset successful!' })
    //after successful reset, delete the token used for verification of password reset
    await PasswordResetToken.findByIdAndDelete(req.resetToken._id)
}

// Login/ Sign-in
exports.userSignIn = async (req, res) => {
    //inputs will be email and password by the user
    //we need to store this entered data
    const { email, password } = req.body;

    //find the user that corresponds to this email
    const user = await User.findOne({ email })
    //if no such user exists
    if (!user) { return res.status(404).json({ error: 'User not found!' }) }

    //if user exists we need to compare the password with our DB
    //using our compare password function defined in models/user.js
    const matched = await user.comparePassword(password)
    //if not matched
    if (!matched) { return res.status(401).json({ error: 'UhOh! Incorrect Password.' }) }

    const { name, _id, role } = user;

    //if password is correct, use JWT to 
    // const tokenName = jwt.sign(payload, secretKey, options)
    const jwtToken = jwt.sign({ userID: user._id }, process.env.SECRET_KEY)

    res.status(201).json({
        user: {
            id: _id,
            name: name,
            email: email,
            role: role,
            token: jwtToken
        }
    })
}