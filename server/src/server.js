import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import profRoutes from "./routes/prof.routes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import tripsRoutes from "./routes/trips.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware: Parse to object
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Route Handlers
app.use("/auth", authRoutes);
app.use("/prof", authMiddleware, profRoutes);
app.use("/trips", authMiddleware, tripsRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on: http://localhost:${PORT}`);
});
