const express = require("express")
const submoduleControllers = require("../controllers/submoduleControllers")
const authenticate = require("../middlewares/admMiddleware")

const router = express.Router()

router.post("/create_submodule", authenticate, submoduleControllers.createSubmodule)
router.get("/:id/all_submodule", authenticate, submoduleControllers.getAllSubmodule)

module.exports = router;