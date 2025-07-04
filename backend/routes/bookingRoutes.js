const express = require("express");
const router = express.Router();
const { createBooking, getBookingById } = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/auth");

// @route   POST /api/bookings
router.post("/", verifyToken, createBooking);

// @route   GET /api/bookings/:id
router.get("/:id", verifyToken, getBookingById);

module.exports = router;
