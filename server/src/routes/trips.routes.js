import express from "express";
import { db } from "../db.js";
import { trips } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

const router = express.Router();

// --------------------------------
// Get Trips - GET /trips
// --------------------------------
router.get("/", async (req, res) => {
  try {
    const userId = req.userId;

    const userTrips = await db
      .select()
      .from(trips)
      .where(eq(trips.userId, userId));

    return res.status(200).json({ trips: userTrips });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "could not fetch trips" });
  }
});

// ------------------------------
// Create New Trip - POST /trips
// ------------------------------
router.post("/", async (req, res) => {
  try {
    // destruct trip details
    const { destination, startDate, endDate } = req.body;

    // extract user after verified
    const userId = req.userId;

    // validate data
    if (!destination || !startDate) {
      return res
        .status(400)
        .json({ error: "Destination and start date are required" });
    }

    // insert new trip
    const [newTrip] = await db
      .insert(trips)
      .values({
        userId,
        destination,
        startDate,
        endDate,
      })
      .returning();

    // response
    return res.status(201).json({
      message: "Trip added successfully",
      trip: newTrip,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "could not create new trip" });
  }
});

// --------------------------------
// Update a Trip - PUT /trips/:id
// --------------------------------
router.put("/:id", async (req, res) => {
  try {
    const tripId = parseInt(req.params.id);
    if (isNaN(tripId)) {
      return res.status(400).json({ error: "Invalid trip ID" });
    }

    const userId = req.userId;

    const { destination, startDate, endDate } = req.body;

    const updateData = {
      ...(destination && { destination }),
      ...(startDate && { startDate }),
      ...(endDate !== undefined && { endDate }),
    };
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    const [updatedTrip] = await db
      .update(trips)
      .set(updateData)
      .where(and(eq(trips.userId, userId), eq(trips.id, tripId)))
      .returning();

    if (!updatedTrip) {
      return res
        .status(404)
        .json({ error: "Trip not found or unauthorized to edit" });
    }

    return res
      .status(200)
      .json({ message: "Trip updated successfully", updatedTrip });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update trip" });
  }
});

// --------------------------------
// Delete Trip - DELETE /trips/:id
// --------------------------------
router.delete("/:id", async (req, res) => {
  try {
    // extract trip ID from URL params
    const tripId = parseInt(req.params.id);
    if (isNaN(tripId)) {
      return res.status(400).json({ error: "Invalid trip ID" });
    }

    // extract user after verified
    const userId = req.userId;

    // delete trip
    const [delTrip] = await db
      .delete(trips)
      .where(and(eq(trips.id, tripId), eq(trips.userId, userId)))
      .returning();

    if (!delTrip) {
      return res
        .status(404)
        .json({ error: "trip not found or unauthorized to delete" });
    }

    return res.status(200).json({ message: "trip has been deleted", delTrip });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "could not delete trip" });
  }
});

export default router;
