import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import tokenValidation from "../middlewares/tokenValidation.js";

dotenv.config();

const router = express.Router();

// ===============================
// REGISTER - POST /users
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      age,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
      },
    });
  } catch (err) {
    console.error("[POST /users error]:", err.message);
    if (err.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
});

// ===============================
// LOGIN - POST /users/login
// ===============================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  } catch (err) {
    console.error("[POST /users/login error]:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});


// ===============================
// GET ALL USERS - GET /users (requires auth)
// ===============================
router.get("/", tokenValidation, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("[GET /users error]:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


// ===============================
// UPDATE USER - PUT /users/:id (requires auth)
// ===============================
router.put("/:id", tokenValidation, async (req, res) => {
  const { name, email, age } = req.body;

  if (req.userId !== req.params.id) {
    return res.status(403).json({ error: "Unauthorized to update this user" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error("[PUT /users/:id error]:", err.message);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// ===============================
// DELETE USER - DELETE /users/:id (requires auth)
// ===============================
router.delete("/:id", tokenValidation, async (req, res) => {
  if (req.userId !== req.params.id) {
    return res.status(403).json({ error: "Unauthorized to delete this user" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error("[DELETE /users/:id error]:", err.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// ===============================
// GET SINGLE USER - GET /users/:id (public)
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("[GET /users/:id error]:", err.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
