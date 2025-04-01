const express = require("express");
const feedbackController = require("../controller/feebackController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  auth.verifiedUser,
  auth.checkRoles("supervisor"),
  feedbackController.giveFeedback
);
router.get(
  "/:logbook_id",
  auth.verifiedUser,
  auth.checkRoles("supervisor"),
  feedbackController.fetchFeedback
);
router.get(
  "/:supervisor_id",
  auth.verifiedUser,
  auth.checkRoles("student"),
  feedbackController.fetchFeedbackBySupervisor
);

module.exports = router;
