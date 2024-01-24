const express = require('express')
const {validate, userValidator} = require("../middlewares/validator")
const {} = require("../middlewares/validator")

const { create, verifyEmail, forgetPassword } = require("../controllers/user")

const{isValidPassResetToken} = require("../middlewares/verifyPasswordResetToken")
const router = express.Router()

router.post('/verify-email', verifyEmail) //route to email verification (token comparison actually)

router.post('/create', userValidator, validate, create) //create is the actual route handler/controller that will be executed if the request passes through the previous middlewares without errors.

router.post('/forget-password', forgetPassword)

router.post('/verify-pass-reset-token', isValidPassResetToken, (req, res) =>{
    res.json({valid:true})
}) //isValidPassResetToken is a middleware 

module.exports = router