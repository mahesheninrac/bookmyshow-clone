const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    show: { type: mongoose.Schema.Types.ObjectId, ref: "Show" },
    seats: [String],
    totalAmount: Number,
    bookingDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    transactionId: String
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
