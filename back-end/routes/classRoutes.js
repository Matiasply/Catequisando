const { createClass } = require("../controllers/classControllers")
const authenticate = require("../middlewares/admMiddleware")
const express = require("express")

const router = express.Router()

router.post("/create_class", authenticate, createClass)

module.exports = router;