const express = require("express")
const { createSubmodule } = require("../controllers/submoduleControllers")
const authenticate = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/create_submodule", authenticate, createSubmodule)

module.exports = router;