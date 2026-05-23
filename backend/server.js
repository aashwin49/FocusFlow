import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import logger from "./middlewares/logger.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();

app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// health routes
app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.get("/api/health", (req, res) => {
  res.json({ message: "API running successfully" });
});

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});