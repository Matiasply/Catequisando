const express = require('express');
const authController = require('../controllers/authControllers');
const authenticate = require('../middleware/authMiddleware');

const auth_router = express.Router();

auth_router.post('/login', authenticate, authController);