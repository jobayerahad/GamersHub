const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

// @desc    Get an user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Authenticate user & get token
exports.authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { emailOrUsername, password } = req.body;

  try {
    // See if the user exists
    let user;
    let userByEmail = await User.findOne({ email: emailOrUsername });
    let userByName = await User.findOne({ username: emailOrUsername });

    if (userByEmail) user = userByEmail;
    else if (userByName) user = userByName;
    else return res.status(400).json({ errors: [{ msg: "No user found" }] });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ errors: [{ msg: "Wrong password!" }] });

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, config.get("jwtsecret"), { expiresIn: 3600 * 24 * 7 }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error(errors.message);
    res.status(500).send("Server error");
  }
};
