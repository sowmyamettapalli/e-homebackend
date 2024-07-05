// Import necessary modules
import express from "express";
import path from "path";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";

// Initialize Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err.message);
});

// Serve static files from the React frontend build directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "e-home/build")));

// Routes
app.use("/api/auth", authRoutes);

// Default route for serving React app
// Uncomment this if you want to serve React's index.html for all routes
/*
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "e-home/build/index.html"));
});
*/

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
