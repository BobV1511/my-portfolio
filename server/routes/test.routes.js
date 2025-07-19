import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/secret", authCtrl.requireSignin, (req, res) => {
  res.json({ message: "You accessed a protected route!" });
});

export default router;
