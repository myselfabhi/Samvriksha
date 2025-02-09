const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const OrderModel = require("./models/order");
const Cart = require("./models/cart");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Email Transporter (Set your SMTP details)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_ID,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const SECRET_KEY = process.env.JWT_SECRET;



const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};



app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactNo, address, pincode } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashedPassword,
      contactNo,
      address,
      pincode,
      isVerified: false,
    });

    await newUser.save();

    // Generate verification token
    const token = jwt.sign({ email: normalizedEmail }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send email verification link
    const verifyLink = `http://localhost:3000/verify-email?token=${token}`;

    try {
      await transporter.sendMail({
        from: '"Samvriksha" <test527967@gmail.com>',
        to: normalizedEmail,
        subject: "Email Verification",
        html: `<p>Click the link to verify your email: <a href="${verifyLink}">${verifyLink}</a></p>`,
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr.message);
    }

    res.json({ message: "Registration successful. Check your email for verification." });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// Email Verification Route
app.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await User.findOneAndUpdate({ email: decoded.email }, { isVerified: true });

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

app.get("/api/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from header
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, SECRET_KEY); // Verify token
    const user = await User.findById(decoded.id).select("-password"); // Get user without password

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
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



// Add to cart
app.post("/cart/add", authenticate, async (req, res) => {
  try {
    const { productId, quantity, selectedColor } = req.body;  // Include selectedColor
    const userId = req.user._id; // Extracted from authenticated user

    // Ensure quantity is a valid number
    const validQuantity = isNaN(quantity) || quantity <= 0 ? 1 : quantity;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: validQuantity, price: product.price, selectedColor: selectedColor || "" }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId && item.selectedColor === selectedColor
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += validQuantity;
      } else {
        cart.items.push({
          productId,
          quantity: validQuantity,
          price: product.price,
          selectedColor: selectedColor || "",
        });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



// Update quantity
app.put("/cart/update", authenticate, async (req, res) => {
  try {
    const { productId, quantity, selectedColor } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.selectedColor === selectedColor
    );
    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
      }
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



// Remove product from cart
app.delete("/cart/remove", authenticate, async (req, res) => {
  try {
    const { productId, selectedColor } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId || item.selectedColor !== selectedColor
    );
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// Get user cart
app.get("/cart", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});




// Get All Products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/api/products/:slug", async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
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

// Create an order & generate Razorpay order ID
app.post("/api/orders", authenticate, async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    if (!userDetails) {
      return res.status(400).json({ message: "User not found" });
    }

    // Fetch cart items for the user
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Map products from the cart
    const products = cart.items.map((item) => ({
      product: item.productId._id,
      quantity: item.quantity,
      selectedColor: item.selectedColor,
    }));

    const totalAmount = cart.totalAmount;

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    // Save order in DB with pending payment
    const newOrder = new OrderModel({
      user: userDetails._id,
      products,
      totalAmount,
      status: "pending",
      contactDetails: {
        contactNo: userDetails.contactNo,
        address: userDetails.address,
        pincode: userDetails.pincode,
      },
      paymentId: razorpayOrder.id, // Store Razorpay order ID
      paymentStatus: "pending",
    });

    await newOrder.save();

    // Clear the cart after order creation
    await Cart.deleteOne({ userId: req.user.id });

    res.status(201).json({ order: newOrder, razorpayOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// Verify payment and update order status
app.post("/api/orders/verify-payment", authenticate, async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  try {
    // Find the order in DB
    const order = await OrderModel.findOne({ paymentId: razorpay_order_id });

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    // Generate the signature for verification
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Compare the signatures
    if (generatedSignature === razorpay_signature) {
      // Payment is valid, update order
      order.paymentStatus = "success";
      order.status = "pending"; // Order processing starts
      await order.save();

      return res.status(200).json({ message: "Payment verified successfully", order });
    } else {
      // Invalid signature
      order.paymentStatus = "failed";
      await order.save();

      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
