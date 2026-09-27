//  /auth - Create User, Get All Users, Get A User
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../db.js";
import { eq } from "drizzle-orm";
import { users } from "../db/schema.js";

const router = express.Router();

// ------------------------------
// Sign Up - POST /auth/signup
// ------------------------------
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    // Check for email duplicates
    const dup = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (dup.length) {
      return res.status(400).json({ error: "This email is already taken." });
    }

    // Encrypt password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Inserting new user to database
    const [newUser] = await db
      .insert(users)
      .values({ firstName, lastName, email, password: hashedPassword })
      .returning();

    console.log(`[Created new user] email: ${email}`);

    // Create a token
    const token = jwt.sign({ id: newUser.id }, process.env.ACCESS_JWT_SECRET, {
      expiresIn: "24h",
    });

    // Response
    res.status(201).json({
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// ------------------------------
// Sign In - POST /auth/signin
// ------------------------------
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    // Check for matching email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check password
    const passIsValid = bcrypt.compareSync(password, user.password);

    if (!passIsValid) {
      return res.status(400).json({ error: "Invalid password, try again." });
    }

    // Create a token
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_JWT_SECRET, {
      expiresIn: "24h",
    });
    console.log(token || "Token does not exist");

    // Response
    res.status(201).json({
      user,
      token,
      message: `Hello ${user.firstName}, Welcome back!`,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
