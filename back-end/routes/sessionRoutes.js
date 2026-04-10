const express = require("express")
const {createSession} = require("../controllers/sessionControllers")
const authenticate = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/create_session", authenticate, createSession);

module.exports = router;