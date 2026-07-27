const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const jwtSecret = "MySuperSecretKeyForLocalDevelopment123!"

// Create User
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
        location: req.body.location,
      });

      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false });
    }
  }
);
// Login User
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({
          success: false,
          errors: "Invalid email or password",
        });
      }

      const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res.status(400).json({
          success: false,
          errors: "Invalid email or password",
        });
      }

      const data = {
        user:{
          id:userData.id
        }
      }

      const authToken = jwt.sign(data,jwtSecret)
      return res.json({
        success: true,
        authToken:authToken
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
      });
    }
  }
);

module.exports = router;