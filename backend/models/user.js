const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Email verification flag
});

const userModel = mongoose.model("Users", UserSchema);
module.exports = userModel;