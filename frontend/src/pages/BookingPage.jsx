import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const BookingPage = () => {
    const { showId } = useParams();
    const navigate = useNavigate();

    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchShow = async () => {
            try {
                const res = await API.get(`/shows/${showId}`);
                setShow(res.data);
            } catch (err) {
                console.error("Error fetching show:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShow();
    }, [showId]);

    const toggleSeat = (seat) => {
        setSelectedSeats((prev) =>
            prev.includes(seat)
                ? prev.filter((s) => s !== seat)
                : [...prev, seat]
        );
    };

    const confirmBooking = async () => {
        if (selectedSeats.length === 0) return alert("Select at least one seat");

        try {
            await API.post("/bookings", {
                showId,
                seats: selectedSeats,
            });

            alert("Booking confirmed!");
            navigate("/profile");
        } catch (err) {
            console.error("Booking error:", err);
            alert("Booking failed");
        }
    };

    if (isLoading) return <div className="p-6">Loading show details...</div>;
    if (!show) return <div className="p-6">Show not found</div>;

    const allSeats = Array.from({ length: 40 }, (_, i) => `S${i + 1}`);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Book Your Seat</h2>

            <div className="mb-4 space-y-1">
                <p className="text-lg font-semibold">{show.movie?.title}</p>
                <p className="text-sm text-gray-600">
                    {show.theater?.name} • {show.screen?.name}
                </p>
                <p className="text-sm text-gray-600">
                    {new Date(show.date).toLocaleDateString()} • {show.startTime}
                </p>
                <p className="text-sm text-gray-600">
                    Format: {show.format} • Language: {show.language}
                </p>
                <p className="text-sm text-gray-600">Price per seat: ₹{show.pricePerSeat}</p>
            </div>

            <h3 className="font-medium mb-2">Select Seats:</h3>
            <div className="grid grid-cols-8 gap-2 mb-6">
                {allSeats.map((seat) => {
                    const isBooked = show.bookedSeats?.includes(seat);
                    const isSelected = selectedSeats.includes(seat);

                    return (
                        <button
                            key={seat}
                            onClick={() => !isBooked && toggleSeat(seat)}
                            className={`p-2 text-sm rounded border
                ${isBooked ? "bg-gray-300 cursor-not-allowed" : ""}
                ${isSelected ? "bg-red-600 text-white" : "bg-white"}
                hover:border-red-500`}
                        >
                            {seat}
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-between items-center">
                <p className="text-gray-700">
                    Selected: {selectedSeats.length} seat(s) – ₹{selectedSeats.length * show.pricePerSeat}
                </p>
                <button
                    onClick={confirmBooking}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default BookingPage;
