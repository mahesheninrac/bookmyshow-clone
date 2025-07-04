const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    passwordHash: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
