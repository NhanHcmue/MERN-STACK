const Users = require("../models/Users");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

require("dotenv").config();

const sendEmail = require("../utils/sendEmail");

const loginUsers = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing parameters!",
    });
  }

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password!",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        roleId: user.roleId,
      },
      process.env.PASSJWT
    );

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

const registerUsers = async (req, res) => {
  const { name, password, email } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing parameters!",
    });
  }

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = new Users({
      email,
      password: hashedPassword,
      name,
      roleId: "user",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=User", // bạn có thể đổi link avatar mặc định ở đây
      status: "Pending",
      isVerified: false,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.PASSJWT, {
      expiresIn: "1d",
    });

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

      console.log("Verify URL:", verifyUrl);
    await sendEmail(
      email,
      "Kích hoạt tài khoản",
      `<h3>Xin chào ${name}</h3><p>Nhấn vào nè má <a href="${verifyUrl}">đây</a> để kích hoạt tài khoản của bạn.</p>`
    );

    return res.status(201).json({
      success: true,
      message: "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản cl",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Registration failed!",
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params; // ✅ Lấy token từ URL
    console.log("Xác minh token:", token); // ✅ Sử dụng sau khi khai báo

    const decoded = jwt.verify(token, process.env.PASSJWT);
    const user = await Users.findById(decoded.userId);

    if (!user) {
      return res.status(400).send("Người dùng không tồn tại.");
    }

    if (user.isVerified) {
      return res.send("Tài khoản đã được xác minh trước đó.");
    }

    user.isVerified = true;
    user.status = "Active";
    await user.save();

    res.send("Kích hoạt tài khoản thành công!");
  } catch (err) {
    console.error("Verify email error:", err);
    res.status(400).send("Liên kết không hợp lệ hoặc đã hết hạn.");
  }
};



const getUserInfo = async (req, res) => {
  try {
    const user = await Users.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

const editUser = async (req, res) => {
  const userId = req.userId;
  const { _id, name, email, passwordOld, password } = req.body;

  if (userId !== _id) {
    return res.status(403).json({
      success: false,
      message: "Bạn chỉ được chỉnh sửa thông tin của bạn!",
    });
  }

  try {
    const user = await Users.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (passwordOld && password) {
      const isOldPasswordCorrect = await argon2.verify(user.password, passwordOld);

      if (!isOldPasswordCorrect) {
        return res.status(400).json({
          success: false,
          message: "Mật khẩu cũ bị sai, vui lòng kiểm tra lại!",
        });
      }

      const newHashedPassword = await argon2.hash(password);
      user.password = newHashedPassword;
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return res.json({
      success: true,
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email không được để trống.",
    });
  }

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email không tồn tại trong hệ thống.",
      });
    }

    // Tạo token reset password
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Lưu token và thời gian hết hạn (1 giờ)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 giờ
    await user.save();

    // Tạo link đặt lại mật khẩu
    const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`;

    // Nội dung email
    const message = `
      <p>Bạn nhận được email này vì đã yêu cầu đặt lại mật khẩu.</p>
      <p>Vui lòng nhấn vào link sau để đặt lại mật khẩu:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
    `;


    // Gửi email
    await sendEmail(email, "Đặt lại mật khẩu", message);

    return res.json({
      success: true,
      message: "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư đến.",
    });
  } catch (error) {
    console.error("forgotPassword error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ, vui lòng thử lại sau.",
    });
  }
};
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ success: false, message: "Token và mật khẩu mới là bắt buộc." });
  }

  try {
    const user = await Users.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn." });
    }

    // Hash mật khẩu mới trước khi lưu
    const hashedPassword = await argon2.hash(newPassword);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ success: true, message: "Mật khẩu đã được đặt lại thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ." });
  }
};


module.exports = {
  loginUsers,
  registerUsers,
  getUserInfo,
  editUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
