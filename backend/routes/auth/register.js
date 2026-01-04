const express = require("express");
const bcrypt = require("bcryptjs");
const { findByEmail, createUser } = require("../../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("========== REGISTER API HIT ==========");

  const { name, email, password } = req.body;

  console.log("[REGISTER] Incoming Body:", { name, email, password });

  // Step 1: Validation
  if (!name || !email || !password) {
    console.log("[REGISTER] ❌ Missing fields");
    return res.status(400).json({
      message: "All fields (name, email, password) are required",
    });
  }

  // Step 2: Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    console.log("[REGISTER] ❌ Invalid email format:", email);
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Step 3: DB check
    console.log("[REGISTER] 🔍 Checking email in DB...");
    const existingUser = await findByEmail(email);
    console.log("[REGISTER] DB result:", existingUser);

    if (existingUser) {
      console.log("[REGISTER] ❌ Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    // Step 4: Hash password
    console.log("[REGISTER] 🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("[REGISTER] Hashed password:", hashedPassword);

    // Step 5: Save user
    console.log("[REGISTER] 💾 Saving user to DB...");
    await createUser(name, email, hashedPassword);

    console.log("[REGISTER] ✅ User registered successfully");
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("[REGISTER] ❌ Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
