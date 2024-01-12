const userController = require('../controllers/UserController')
const express = require('express')
const router = express.Router()

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);

module.exports = router