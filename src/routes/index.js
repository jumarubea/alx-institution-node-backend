const express = require("express");
const userRoutes = require("./userRoutes");
const feedbackRoutes = require("./feedbackRoutes");
const reportRoutes = require("./reportRoutes");
const logbookRoutes = require("./logbookRoutes");

const router = express.Router();
router.use("/auth", userRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/reports", reportRoutes);
router.use("/logbook", logbookRoutes);

module.exports = router;
