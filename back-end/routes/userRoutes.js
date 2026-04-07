const express = require('express');
const userController = require('../controllers/userControllers');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userController.createUser);
router.get('/me', authenticate, userController.getCurrentUser);

module.exports = router;