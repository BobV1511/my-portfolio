// server.js
import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// API ROUTES
import authRoutes from "./server/routes/auth.routes.js";
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);

// ========= Serve React Frontend =========
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "build"))); // nếu dùng CRA

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// ========================================

// Connect MongoDB
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to the database!"))
  .catch(err => {
    throw new Error(`unable to connect to database: ${err}`);
  });

// Start server
app.listen(config.port, () => {
  console.info("Server started on port %s.", config.port);
});
