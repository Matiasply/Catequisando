const express = require('express');
const authController = require('../controllers/authControllers');
const authenticate = require('../middlewares/authMiddleware');

const auth_router = express.Router();

auth_router.post('/login', authController.login);

module.exports = auth_router;