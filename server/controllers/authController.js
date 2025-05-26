const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    const activationLink = `${process.env.CLIENT_URL}/verify/${token}`;
    await sendEmail(
      email,
      "Kích hoạt tài khoản của bạn",
      `<p>Nhấn vào <a href="${activationLink}">đây</a> để kích hoạt tài khoản.</p>`
    );

    res.json({ success: true, message: "Đăng ký thành công! Vui lòng kiểm tra email." });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.id, { isVerified: true });
    res.send("Kích hoạt tài khoản thành công!");
  } catch (err) {
    res.status(400).send("Liên kết không hợp lệ hoặc đã hết hạn.");
  }
};
