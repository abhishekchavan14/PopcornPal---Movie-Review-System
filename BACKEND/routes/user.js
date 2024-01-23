const express = require('express')
const {validate, userValidator} = require("../middlewares/validator")
const {} = require("../middlewares/validator")

const { create, verifyEmail } = require("../controllers/user")
const router = express.Router()

router.post('/verify-email', verifyEmail) //route to email verification (token comparison actually)

router.post('/create', userValidator, validate, create) //create is the actual route handler/controller that will be executed if the request passes through the previous middlewares without errors.


module.exports = router