const Movie = require("../models/movieModel");

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: "Error fetching movies", error: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.json(movie);
    } catch (err) {
        res.status(404).json({ message: "Movie not found" });
    }
};

exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json({ message: "Movie created", movie });
    } catch (err) {
        res.status(500).json({ message: "Error creating movie", error: err.message });
    }
};
