const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findByEmail } = require("../../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("========== LOGIN API HIT ==========");

  const { email, password } = req.body;
  console.log("[LOGIN] Incoming Body:", { email, password });

  // Step 1: Validation
  if (!email || !password) {
    console.log("[LOGIN] ❌ Missing email or password");
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    // Step 2: Find user
    console.log("[LOGIN] 🔍 Searching user in DB...");
    const user = await findByEmail(email);
    console.log("[LOGIN] DB user:", user);

    if (!user) {
      console.log("[LOGIN] ❌ User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 3: Password compare
    console.log("[LOGIN] 🔐 Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("[LOGIN] Password match result:", isMatch);

    if (!isMatch) {
      console.log("[LOGIN] ❌ Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 4: JWT generation
    console.log("[LOGIN] 🔑 Generating JWT...");
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log("[LOGIN] ✅ JWT generated:", token);
    res.json({ token });

  } catch (error) {
    console.error("[LOGIN] ❌ Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
