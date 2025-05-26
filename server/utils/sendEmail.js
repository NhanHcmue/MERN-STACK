const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 Sending email to:", to); // ✅ THÊM DÒNG NÀY

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent to:", to); // ✅ THÊM DÒNG NÀY
  } catch (error) {
    console.log("❌ Email sending error:", error); // ✅ THÊM DÒNG NÀY
  }
};

module.exports = sendEmail;
