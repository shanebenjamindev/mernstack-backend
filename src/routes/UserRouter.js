const userController = require('../controllers/UserController')
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router()

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/log-out', userController.logoutUser);
router.post('/refresh-token', userController.refreshToken);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/getAllUser', authMiddleware, userController.getAllUser);
router.get('/detail-user/:id', authUserMiddleware, userController.detailUser);

module.exports = router