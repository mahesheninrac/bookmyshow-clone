const express = require("express");
const router = express.Router();
const { getShowsByMovie, createShow } = require("../controllers/showController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// @route   GET /api/shows/movie/:movieId
router.get("/movie/:movieId", getShowsByMovie);

// @route   POST /api/shows
router.post("/", verifyToken, isAdmin, createShow);

module.exports = router;
