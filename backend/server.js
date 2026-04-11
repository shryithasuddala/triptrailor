const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// ✅ IMPORTANT
app.use(express.json());
app.use(cors());

// DB
mongoose.connect("mongodb://127.0.0.1:27017/travelDB");

// MODEL
const User = mongoose.model("User", {
  email: String,
  password: String,
});

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Missing fields ❌");
    }

    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists ❌");

    const hashed = await bcrypt.hash(password, 10);

    await new User({ email, password: hashed }).save();

    res.send("Registered Successfully ✅");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error ❌");
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found ❌");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("Wrong password ❌");

    res.send("Login Success ✅");
  } catch (err) {
    res.status(500).send("Error ❌");
  }
});

// RESET PASSWORD
app.post("/reset", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found ❌");

    const hashed = await bcrypt.hash(newPassword, 10);

    await User.updateOne({ email }, { password: hashed });

    res.send("Password Updated ✅");
  } catch (err) {
    res.status(500).send("Error ❌");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));