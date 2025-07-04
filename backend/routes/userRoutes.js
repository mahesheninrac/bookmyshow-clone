const express = require("express");
const router = express.Router();
const { getUserProfile, getBookingHistory } = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

// @route   GET /api/users/profile
router.get("/profile", verifyToken, getUserProfile);

// @route   GET /api/users/bookings
router.get("/bookings", verifyToken, getBookingHistory);

module.exports = router;
