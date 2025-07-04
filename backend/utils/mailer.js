const nodemailer = require("nodemailer");
const fs = require("fs");

const sendTicketMail = async (toEmail, subject, plainText, pdfPath, userName, movieTitle) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f8f8f8; padding: 20px; border-radius: 8px;">
        <h2 style="color: #d32f2f;">🎟️ BookMyShow Clone - Your Ticket</h2>
        <p>Hi <strong>${userName}</strong>,</p>
        <p>Your booking for <strong>${movieTitle}</strong> is confirmed! 🥳</p>

        <div style="background-color: #ffffff; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <p>We've attached your ticket as a PDF.</p>
          <p style="margin-bottom: 0;">Please carry it with you or show it at the counter.</p>
        </div>

        <p>Enjoy your movie! 🍿</p>
        <p style="margin-top: 32px;">Regards,<br>BookMyShow Clone Team</p>

        <hr style="margin-top: 40px;">
        <small style="color: #999;">This is an automated email. Do not reply.</small>
      </div>
    `;

        const mailOptions = {
            from: `"BookMyShow Clone 🎬" <${process.env.EMAIL_FROM}>`,
            to: toEmail,
            subject,
            text: plainText,
            html: htmlTemplate,
            attachments: [
                {
                    filename: pdfPath.split("/").pop(),
                    path: pdfPath,
                },
            ],
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ HTML Ticket email sent to ${toEmail}`);
    } catch (err) {
        console.error("❌ Failed to send HTML email:", err.message);
    }
};

module.exports = sendTicketMail;
