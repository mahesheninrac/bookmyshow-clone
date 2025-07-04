const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

const generateTicketPDF = require("../utils/ticketGenerator");

exports.createBooking = async (req, res) => {
    try {
        const { showId, seats, totalAmount, transactionId } = req.body;

        const show = await Show.findById(showId);
        const movie = await Movie.findById(show.movie);
        const theater = await Theater.findById(show.theater);
        const user = await User.findById(req.user.id);

        const alreadyBooked = seats.some(seat => show.bookedSeats.includes(seat));
        if (alreadyBooked) {
            return res.status(409).json({ message: "One or more seats already booked" });
        }

        show.bookedSeats.push(...seats);
        await show.save();

        const booking = new Booking({
            user: user._id,
            show: showId,
            seats,
            totalAmount,
            paymentStatus: "Paid",
            transactionId,
        });
        await booking.save();

        user.bookings.push(booking._id);
        await user.save();

        // 🔥 Generate Ticket PDF
        const pdfPath = await generateTicketPDF(booking, user, show, movie, theater);

        res.status(201).json({
            message: "Booking successful",
            booking,
            ticket: {
                pdfUrl: `/tickets/${path.basename(pdfPath)}`
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating booking", error: err.message });
    }
};


exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("show")
            .populate("user");

        if (!booking) return res.status(404).json({ message: "Booking not found" });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: "Error fetching booking", error: err.message });
    }
};
