const express = require("express");
const moduleControllers = require("../controllers/moduleControllers")
const authenticate = require("../middlewares/admMiddleware")

const router = express.Router()

router.post('/create_module', authenticate, moduleControllers.createModule)
router.get('/:id/all_module', authenticate, moduleControllers.getAllModule)

module.exports = router;