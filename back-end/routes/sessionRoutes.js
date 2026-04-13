const express = require("express")
const sessionControllers = require("../controllers/sessionControllers")
const authenticate = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/create_session", authenticate, sessionControllers.createSession);
router.get("/:id/all", authenticate, sessionControllers.getAllSection )

module.exports = router;