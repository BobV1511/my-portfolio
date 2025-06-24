import Qualification from "../models/qualification.model.js";

export const getQualifications = async (req, res) => {
  const data = await Qualification.find();
  res.json(data);
};

export const getQualificationById = async (req, res) => {
  const data = await Qualification.findById(req.params.id);
  res.json(data);
};

export const createQualification = async (req, res) => {
  const newItem = new Qualification(req.body);
  await newItem.save();
  res.status(201).json(newItem);
};

export const updateQualification = async (req, res) => {
  const updated = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteQualification = async (req, res) => {
  await Qualification.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

export const deleteAllQualifications = async (req, res) => {
  await Qualification.deleteMany({});
  res.json({ message: "All deleted" });
};
