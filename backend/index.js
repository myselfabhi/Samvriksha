const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const SECRET_KEY = process.env.JWT_SECRET || "secret@#1234";

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// User Registration
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, cart: [] });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7d" });
    res.json({ token, user, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get User Cart
app.get("/api/cart", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.product");
  res.json(user.cart);
});

// Add to Cart
app.post("/api/cart", authenticate, async (req, res) => {
  const { productId, quantity, selectedColor } = req.body;
  const user = await User.findById(req.user.id);
  
  const existingItem = user.cart.find(item => item.product.toString() === productId && item.selectedColor === selectedColor);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity, selectedColor });
  }

  await user.save();
  res.json(user.cart);
});

// Remove from Cart
app.delete("/api/cart/:productId", authenticate, async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user.id);
  
  user.cart = user.cart.filter(item => item.product.toString() !== productId);
  await user.save();
  res.json(user.cart);
});

// Get All Products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Creating a new product
app.post("/products", async (req, res) => {
  try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json({product, message: "Product created successfully"});
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Create Order
app.post("/api/orders", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.product");
  
  if (user.cart.length === 0) return res.status(400).json({ message: "Cart is empty" });

  const order = new Order({
    user: user._id,
    items: user.cart.map(({ product, quantity, selectedColor }) => ({ product, quantity, selectedColor })),
    totalPrice: user.cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
  });

  await order.save();
  user.cart = [];
  await user.save();

  res.status(201).json({ message: "Order placed successfully", order });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
