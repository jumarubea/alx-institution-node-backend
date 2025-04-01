const express = require("express");
const userController = require("../controller/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/all-users", auth.verifiedUser, userController.getAllUsers);
router.get("/user/:id", auth.verifiedUser, userController.getUserById);

module.exports = router;
