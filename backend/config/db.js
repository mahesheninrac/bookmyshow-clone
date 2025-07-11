// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to DB: ${err.message}`);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
