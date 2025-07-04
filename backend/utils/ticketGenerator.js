const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

const generateTicketPDF = async (booking, user, show, movie, theater) => {
    const doc = new PDFDocument();
    const fileName = `ticket-${booking._id}.pdf`;
    const filePath = path.join(__dirname, `../tickets/${fileName}`);

    // Ensure directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath));
    }

    // Generate QR code content
    const qrData = `Booking ID: ${booking._id}\nMovie: ${movie.title}\nSeats: ${booking.seats.join(", ")}`;
    const qrImageDataURL = await QRCode.toDataURL(qrData);

    // Stream PDF to file
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Ticket Header
    doc
        .fontSize(20)
        .text("🎟️ BookMyShow - Movie Ticket", { align: "center" })
        .moveDown();

    doc
        .fontSize(14)
        .text(`Movie: ${movie.title}`)
        .text(`Theater: ${theater.name} (${theater.city})`)
        .text(`Date: ${new Date(show.date).toLocaleDateString()} - ${show.startTime}`)
        .text(`Seats: ${booking.seats.join(", ")}`)
        .text(`Amount Paid: ₹${booking.totalAmount}`)
        .text(`Booking ID: ${booking._id}`)
        .text(`Name: ${user.name}`)
        .moveDown();

    // Embed QR Code
    const qrImage = qrImageDataURL.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrImage, "base64");
    doc.image(qrBuffer, { width: 120, align: "center" });

    doc.end();

    return filePath;
};

module.exports = generateTicketPDF;
