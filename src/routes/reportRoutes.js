const express = require("express");
const reportController = require("../controller/reportController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Report Routes
router.get(
  "/:student_id",
  auth.verifiedUser,
  auth.checkRoles("admin"),
  reportController.generateReport
);

module.exports = router;
