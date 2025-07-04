import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resMovie = await API.get(`/movies/${id}`);
                const resShows = await API.get(`/shows/movie/${id}`);
                setMovie(resMovie.data);
                setShows(resShows.data);
                // console.log(resMovie.data);
                // console.log(resShows.data);
            } catch (err) {
                console.error("Error fetching movie or shows:", err);
            }
        };

        fetchData();
    }, [id]);

    if (!movie) return <div className="p-6 text-gray-600">Loading movie details...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3">
                    <img
                        src={movie.posterUrl || "https://via.placeholder.com/300x400"}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="md:col-span-2 p-6 space-y-2">
                        <h1 className="text-3xl font-bold text-red-600">{movie.title}</h1>
                        <p className="text-sm text-gray-500">{movie.genre}</p>
                        <p className="text-gray-700 mt-2">{movie.description}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Available Shows</h2>

                {shows.length === 0 ? (
                    <p className="text-gray-500">No shows available for this movie.</p>
                ) : (
                    <div className="space-y-4">
                        {shows.map((show) => (
                            <div
                                key={show._id}
                                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition"
                            >
                                <div className="space-y-1">
                                    <p className="font-semibold text-lg text-red-600">
                                        {show.theater?.name || "Unknown Theater"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {show.theater?.location || ""} • {show.screen?.name} ({show.screen?.type})
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        📅 {new Date(show.date).toLocaleDateString()} &nbsp; 🕒 {show.startTime}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        🎞 {show.format} • 🗣 {show.language} • 💸 ₹{show.pricePerSeat}
                                    </p>
                                </div>

                                <Link
                                    to={`/book/${show._id}`}
                                    className="bg-red-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-red-700 transition"
                                >
                                    Book Now
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default MovieDetails;
