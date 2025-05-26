// scripts/updateIsVerified.js
const mongoose = require("mongoose");
require("dotenv").config();

const Users = require("../models/Users");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // hoặc uri kết nối của bạn

    const result = await Users.updateMany(
      { isVerified: { $exists: false } },
      { isVerified: false }
    );

    console.log(`Đã cập nhật ${result.modifiedCount} user.`);
    process.exit(0);
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    process.exit(1);
  }
})();
