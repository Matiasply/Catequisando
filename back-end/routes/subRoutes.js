const express = require("express")
const { createSubmodule } = require("../controllers/submoduleControllers")
const authenticate = require("../middlewares/admMiddleware")

const router = express.Router()

router.post("/create_submodule", authenticate, createSubmodule)

module.exports = router;