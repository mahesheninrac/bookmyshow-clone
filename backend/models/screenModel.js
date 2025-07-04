const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
    name: String,
    totalSeats: Number,
    seatLayout: [{
        row: String,
        seats: [{
            number: String,
            type: { type: String, enum: ["Regular", "Premium", "VIP"] }
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model("Screen", screenSchema);
