require("dotenv").config();
const connectDB = require("../config/db");
const mongoose = require("mongoose");

// Model Imports
const User = require("../models/userModel");
const Movie = require("../models/movieModel");
const Theater = require("../models/theaterModel");
const Screen = require("../models/screenModel");
const Show = require("../models/showModel");
const Booking = require("../models/bookingModel");

// Data Imports
const users = require("./users");
const movies = require("./movies");
const theaters = require("./theaters");
const screens = require("./screens");
const bookings = require("./bookings");

const seedData = async () => {
    try {
        await connectDB();

        console.log("🌱 Clearing collections...");
        await User.deleteMany();
        await Movie.deleteMany();
        await Theater.deleteMany();
        await Screen.deleteMany();
        await Show.deleteMany();
        await Booking.deleteMany();

        console.log("🌱 Seeding users...");
        const createdUsers = await User.insertMany(users);

        console.log("🌱 Seeding movies...");
        const createdMovies = await Movie.insertMany(movies);

        console.log("🌱 Seeding theaters...");
        const createdTheaters = await Theater.insertMany(theaters);

        console.log("🌱 Seeding screens...");
        const createdScreens = [];
        let screenCounter = 0;

        for (const theater of createdTheaters) {
            const screenData = screens[screenCounter % screens.length];
            const screen = new Screen(screenData);
            await screen.save();

            theater.screens.push(screen._id);
            await theater.save();

            createdScreens.push(screen);
            screenCounter++;
        }

        console.log("🌱 Seeding shows...");
        const createdShows = [];

        for (let i = 0; i < createdScreens.length; i++) {
            const show = new Show({
                movie: createdMovies[i % createdMovies.length]._id,
                theater: createdTheaters[i % createdTheaters.length]._id,
                screen: createdScreens[i]._id,
                date: new Date(),
                startTime: "18:30",
                format: "2D",
                language: "English",
                pricePerSeat: 250,
                bookedSeats: [],
            });
            await show.save();
            createdShows.push(show);
        }

        console.log("🌱 Seeding bookings...");
        const user = createdUsers.find((u) => u.role === "user");

        for (let i = 0; i < bookings.length; i++) {
            const booking = new Booking({
                user: user._id,
                show: createdShows[i % createdShows.length]._id,
                ...bookings[i],
            });

            // Add booked seats to the show
            createdShows[i % createdShows.length].bookedSeats.push(...bookings[i].seats);
            await createdShows[i % createdShows.length].save();

            await booking.save();
            user.bookings.push(booking._id);
        }

        await user.save();

        console.log("✅ All data seeded successfully!");
        process.exit();
    } catch (err) {
        console.error("❌ Seeding failed:", err.message);
        process.exit(1);
    }
};

seedData();
