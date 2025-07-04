const bcrypt = require("bcryptjs");

module.exports = [
    {
        name: "Admin User",
        email: "admin@bookmyshow.com",
        phone: "9999999999",
        passwordHash: bcrypt.hashSync("admin123", 10),
        role: "admin",
    },
    {
        name: "John Doe",
        email: "john@example.com",
        phone: "8888888888",
        passwordHash: bcrypt.hashSync("user123", 10),
        role: "user",
    },
];
