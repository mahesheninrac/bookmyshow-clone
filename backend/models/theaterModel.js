const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    screens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Screen" }]
}, { timestamps: true });

module.exports = mongoose.model("Theater", theaterSchema);
