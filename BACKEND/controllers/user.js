const nodemailer = require("nodemailer")
const User = require('../models/user')
const EmailVerificationToken = require('../models/emailVerificationToken')
const { isValidObjectId } = require("mongoose")

//using async await for saving the data to DB
const create = async (req, res) => {

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
            user: "73aefe65003d1d",
            pass: "f0f387629fe316"
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
    res.status(201).json({ message: "OTP sent to your Email for Verification!" })
}


//Verifying the user
const verifyEmail = async (req, res) => {
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

    res.status(201).json({ message: 'Your Email has been Verified!' })


    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "73aefe65003d1d",
            pass: "f0f387629fe316"
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


module.exports = { create, verifyEmail }