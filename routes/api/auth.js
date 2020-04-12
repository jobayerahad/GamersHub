const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");

const authController = require("../../controllers/authController");

// @route   GET api/auth
// @access  Private
router.get("/", auth, authController.getUser);

// @route   POST api/auth
// @access  public
router.post(
  "/",
  [
    check("emailOrUsername", "Username or Email is required")
      .not()
      .isEmpty(),
    check("password", "Please enter your password").exists()
  ],
  authController.authUser
);
module.exports = router;
