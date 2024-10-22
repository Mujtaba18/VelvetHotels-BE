const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    age: { type: Number, min: 1, default: null },
    gender: { type: String, enum: ["male", "female"], default: null },
    profile_picture: { type: String, default: null },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
module.exports = User
