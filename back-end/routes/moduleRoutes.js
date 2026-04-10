const express = require("express");
const {createModule} = require("../controllers/moduleControllers")
const authenticate = require("../middlewares/authMiddleware")

const router = express.Router()

router.post('/create_module', authenticate, createModule)

module.exports = router;