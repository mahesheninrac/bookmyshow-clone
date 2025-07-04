const User = require("../models/userModel");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-passwordHash");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching profile", error: err.message });
    }
};

exports.getBookingHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "bookings",
            populate: {
                path: "show",
                populate: { path: "movie theater" }
            }
        });
        res.json(user.bookings);
    } catch (err) {
        res.status(500).json({ message: "Error fetching bookings", error: err.message });
    }
};
