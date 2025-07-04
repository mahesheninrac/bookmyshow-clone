const express = require("express");
const router = express.Router();
const { getAllTheaters, createTheater } = require("../controllers/theaterController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// @route   GET /api/theaters
router.get("/", getAllTheaters);

// @route   POST /api/theaters
router.post("/", verifyToken, isAdmin, createTheater);

module.exports = router;
