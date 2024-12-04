const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// Routes
const usersRoute = require("../routes/UsersRoute");
const uploadRoute = require("../routes/UploadRoute");
const adminRoute = require("../routes/AdminRoute");
const productRoute = require("../routes/ProductRoute");
const orderRoute = require("../routes/OrderRoute");
const reviewRoute = require("../routes/ReviewRoute");

const app = express();

app.use(express.static("public"));
const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI; // Lấy URL từ biến môi trường
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connectDB success!");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e.message);
    process.exit(1); // Thoát chương trình nếu kết nối thất bại
  }
};

connectDB();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/api/auth", usersRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/admin", adminRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
