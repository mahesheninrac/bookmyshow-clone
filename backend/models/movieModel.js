const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    genre: [String],
    language: [String],
    duration: Number,
    releaseDate: Date,
    posterUrl: String,
    trailerUrl: String,
    cast: [String],
    director: String,
    shows: [{ type: mongoose.Schema.Types.ObjectId, ref: "Show" }]
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
