const Theater = require("../models/theaterModel");

exports.getAllTheaters = async (req, res) => {
    try {
        const theaters = await Theater.find().populate("screens");
        res.json(theaters);
    } catch (err) {
        res.status(500).json({ message: "Error fetching theaters", error: err.message });
    }
};

exports.createTheater = async (req, res) => {
    try {
        const theater = new Theater(req.body);
        await theater.save();
        res.status(201).json({ message: "Theater added", theater });
    } catch (err) {
        res.status(500).json({ message: "Error adding theater", error: err.message });
    }
};
