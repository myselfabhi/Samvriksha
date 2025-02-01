const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      selectedColor: String,
    },
  ],
});


const userModel = mongoose.model("Users", UserSchema);
module.exports = userModel;
