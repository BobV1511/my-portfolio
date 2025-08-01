// server.js
import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import cors from "cors";
import express from 'express';


app.use(cors());                        
app.use(express.json());  

import authRoutes from "./server/routes/auth.routes.js";
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});


mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to the database!"))
  .catch(err => { throw new Error(`unable to connect to database: ${err}`); });


app.listen(config.port, () => {
  console.info("Server started on port %s.", config.port);
});
