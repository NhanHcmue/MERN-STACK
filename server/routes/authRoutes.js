const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const {
  registerUsers,
  verifyEmail,
  forgotPassword,
  resetPassword, // import hàm controller forgotPassword
} = require("../controllers/UsersControllers");

// Route đăng ký
router.post("/register", registerUsers);

// Route xác minh email
router.get("/verify/:token", verifyEmail);

// Route quên mật khẩu, chuyển xử lý vào controller forgotPassword

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);
module.exports = router;

