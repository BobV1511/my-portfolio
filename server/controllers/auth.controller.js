// server/controllers/auth.controller.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js";


const signup = async (req, res) => {
  console.log('→ Signup payload:', req.body);
  try {
    const user = new User(req.body);
    await user.save();
    
    return res.status(201).json({
      message: "Successfully signed up!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(400).json({
      error: "Error creating user: " + err.message
    });
  }
};


const signin = async (req, res) => {
  console.log('→ Signin payload:', req.body);
  try {
   
    const user = await User.findOne({ email: req.body.email }).select('+salt +hashed_password');
    console.log('→ User found:', user);
    if (!user) {
      console.log('→ No such user');
      return res.status(401).json({ error: "User not found" });
    }

    const valid = user.authenticate(req.body.password);
    console.log('→ Password match?', valid);
    if (!valid) {
      console.log('→ Wrong password');
      return res.status(401).json({ error: "Email and password don't match." });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.cookie("t", token, { httpOnly: true, expires: new Date(Date.now() + 7*24*3600*1000) });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ error: "Could not sign in" });
  }
};


const signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signed out" });
};


const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});


const hasAuthorization = (req, res, next) => {
  const isOwner = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  const isAdmin = req.auth && req.auth.role === "admin";
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

export default {
  signup,
  signin,
  signout,
  requireSignin,
  hasAuthorization
};
