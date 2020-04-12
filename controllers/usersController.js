const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

// @desc    Register a User
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { firstname, lastname, username, email, password } = req.body;

  try {
    // See if the user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ errors: [{ msg: "User already exists" }] });

    // See if the username already taken
    let isUsername = await User.findOne({ username });
    if (isUsername) return res.status(400).json({ errors: [{ msg: "Username already used." }] });

    const portrait = config.get("picPlaceholder");
    user = new User({ firstname, lastname, email, username, password, portrait });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
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

// @desc    Delete a User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.user.id });
    res.json({ msg: "User Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};

// @desc    Update user name
exports.updateName = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { firstname, lastname } = req.body;

  try {
    let user = await User.findById(req.user.id);

    // Check if the user exists
    if (!user) return res.status(404).json({ msg: "User Not Found" });

    user.firstname = firstname;
    user.lastname = lastname;

    await user.save();
    res.json({ msg: "Your Name Changed Successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};

// @desc    Update user portrait
exports.updateUserPortrait = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    // Check if the user exists
    if (!user) return res.status(404).json({ msg: "User Not Found" });

    // Check if there is a file
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });

    const pathName = path.join(__dirname, "/../client/public/uploads/");
    const { portrait } = req.files;

    portrait.mv(`${pathName}/${portrait.name}`, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("server error");
      }

      res.json({ filename: portrait.name, filepath: `/uploads/${portrait.name}` });
    });

    user.portrait = `/uploads/${portrait.name}`;

    await user.save();

    res.json({ msg: "Portrait Changed Successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};

// @desc    Update user password
exports.updateUserPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { oldPassword, newPassword } = req.body;

  try {
    let user = await User.findById(req.user.id);

    // Check if the user exists
    if (!user) return res.status(404).json({ msg: "User Not Found" });

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ errors: [{ msg: "Old password did'nt match!" }] });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ msg: "Password Changed Successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};
