const express = require("express");
const logbookController = require("../controller/logbookController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Logbook Routes
router.post(
  "/submit",
  auth.verifiedUser,
  auth.checkRoles("student"),
  logbookController.submitLogbook
);
router.get(
  "/:student_id",
  auth.verifiedUser,
  logbookController.getLogbookDetailss
);

router.put(
  "/:id/status",
  auth.verifiedUser,
  auth.checkRoles("supervisor"),
  logbookController.updateStatus
);

module.exports = router;
