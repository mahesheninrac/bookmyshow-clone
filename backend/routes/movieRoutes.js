const express = require("express");
const router = express.Router();
const { getAllMovies, getMovieById, createMovie } = require("../controllers/movieController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// @route   GET /api/movies
router.get("/", getAllMovies);

// @route   GET /api/movies/:id
router.get("/:id", getMovieById);

// @route   POST /api/movies
router.post("/", verifyToken, isAdmin, createMovie);

module.exports = router;
