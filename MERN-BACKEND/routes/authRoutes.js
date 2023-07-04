const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const loginLimiter = require('../middleware/LoginEmitter')


router.route('/signup').post(
    authController.signUp
)

router.route('/login').post(
    loginLimiter, authController.login
)
router.route('/refresh').
get(authController.refresh)

router.route('/logout').post(
    authController.logout
)

module.exports = router