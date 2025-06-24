// server/models/project.model.js
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  firstname: String,
  lastname: String,
  email: String,
  completion: Date,
  description: String,
});

export default mongoose.model("Project", ProjectSchema);
