import express from "express";
import {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = express.Router();
router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
