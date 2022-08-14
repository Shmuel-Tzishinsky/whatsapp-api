const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  __v: {
    type: Number,
    select: false,
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  lestName: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  phone: {
    type: String,
    min: 7,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
    select: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  token: {
    type: String,
    required: false,
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "member",
    enum: ["admin", "staff", "member"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
