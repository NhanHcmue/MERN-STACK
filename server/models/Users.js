const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleId: {
      type: String,
      default: "User",
    },
    image: {
      type: String,
      default :
        "https://www.pngegg.com/vi/png-zwxqf",
    },
    status: {
      type: String,
      default: "Pending",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", Users);
