import jwt from "jsonwebtoken";
import express from "express";
import { users } from "../db/schema.js";
import { db } from "../db.js";
import { eq } from "drizzle-orm";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const id = req.userId;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    console.log(`[profRoutes] User: ${user.email}`);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(503).send({ error: "Could not fetch profile." });
  }
});

export default router;
