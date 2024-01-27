const userController = require('../controllers/UserController')
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router()

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/getAllUser', authMiddleware, userController.getAllUser);
router.get('/detail-user/:id', authUserMiddleware, userController.detailUser);
router.post('/refresh-token', userController.refreshToken);

module.exports = router