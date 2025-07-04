// server.js
const Screen = require("./models/screenModel");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");



// Load env variables
require('dotenv').config({ path: '../.env' });

// Connect to DB
connectDB();

// App setup
const app = express();


// ✅ Allow frontend origin
app.use(cors({ origin: "http://localhost:5173" }));

// If you're using cookies/auth headers, also add:
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Other middlewares
app.use(express.json());



// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/theaters", require("./routes/theaterRoutes"));
app.use("/api/shows", require("./routes/showRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// pdf ticket route
app.use("/tickets", express.static(path.join(__dirname, "tickets")));

// Root
app.get("/", (req, res) => res.send("BookMyShow Clone API is running 🚀"));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
