const express = require("express")
const sectionControllers = require("../controllers/sectionControllers")
const authenticate = require("../middlewares/admMiddleware")

const router = express.Router();

router.post("/create_section", authenticate, sectionControllers.createSection);
router.get("/:id/all", authenticate, sectionControllers.getAllSection )

module.exports = router;