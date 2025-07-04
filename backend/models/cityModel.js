const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    name: String,
    code: String // e.g., delhi-ncr
}, { timestamps: true });

module.exports = mongoose.model("City", citySchema);
