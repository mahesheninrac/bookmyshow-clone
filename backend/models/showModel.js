const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" },
    screen: { type: mongoose.Schema.Types.ObjectId, ref: "Screen" },
    date: Date,
    startTime: String,
    format: { type: String, enum: ["2D", "3D", "IMAX"], default: "2D" },
    language: String,
    pricePerSeat: Number,
    bookedSeats: [String]
}, { timestamps: true });

module.exports = mongoose.model("Show", showSchema);
