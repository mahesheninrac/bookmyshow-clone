import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await API.get("/movies");
                setMovies(res.data);
            } catch (err) {
                console.error("Error fetching movies", err);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-6">🎬 Now Showing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <div
                        key={movie._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={movie.posterUrl || "https://via.placeholder.com/300x400"}
                            alt={movie.title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{movie.genre}</p>
                            <p className="text-sm text-gray-700 line-clamp-3">{movie.description}</p>

                            <Link
                                to={`/movies/${movie._id}`}
                                className="mt-3 inline-block text-red-600 hover:underline font-medium text-sm"
                            >
                                View Shows →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
