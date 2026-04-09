const express = require('express');
const authController = require('../controllers/authControllers');
const authenticate = require('../middlewares/authMiddleware');

const auth_router = express.Router();

auth_router.post('/login', authController.login);
auth_router.post('/refresh', authenticate, authController.refreshToken);
auth_router.post('/logout', authenticate, authController.logout)

module.exports = auth_router;