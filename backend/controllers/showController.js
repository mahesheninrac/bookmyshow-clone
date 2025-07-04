const { default: mongoose } = require("mongoose");
const Show = require("../models/showModel");

exports.getShowsByMovie = async (req, res) => {
    const { movieId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ message: "Invalid movie ID" });
    }

    try {
        const shows = await Show.find({ movie: movieId })
            .populate("theater", "name location")
            .populate("screen", "name type")
            .sort({ date: 1, startTime: 1 });

        res.json(shows);
    } catch (error) {
        console.error("❌ Error fetching shows:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.createShow = async (req, res) => {
    try {
        const show = new Show(req.body);
        await show.save();
        res.status(201).json({ message: "Show created", show });
    } catch (err) {
        res.status(500).json({ message: "Error creating show", error: err.message });
    }
};
