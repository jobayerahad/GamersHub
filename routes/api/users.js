const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const usersController = require("../../controllers/usersController");
const auth = require("../../middleware/auth");

// @route   POST api/users
// @access  public
router.post(
  "/",
  [
    check("firstname", "First name is required").not().isEmpty(),
    check("lastname", "Last name is required").not().isEmpty(),
    check("username", "Please choose a username").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 }),
    check("confirmPassword", "Password and Confirm Password field should be same").custom(
      (value, { req }) => value === req.body.password
    ),
  ],
  usersController.registerUser
);

// @route   POST api/users/password
// @access  Private
router.post(
  "/password",
  [
    auth,
    [
      check("oldPassword", "Old Password and New Password shouldn't be same").custom(
        (value, { req }) => value !== req.body.newPassword
      ),
      check("newPassword", "Please enter a password with 8 or more characters").isLength({
        min: 8,
      }),
      check("confirmPassword", "Password and Confirm Password field should be same").custom(
        (value, { req }) => value === req.body.newPassword
      ),
    ],
  ],
  usersController.updateUserPassword
);

// @route   POST api/users/name
// @access  Private
router.post(
  "/name",
  [
    auth,
    [
      check("firstname", "First name is required").not().isEmpty(),
      check("lastname", "Last name is required").not().isEmpty(),
    ],
  ],
  usersController.updateName
);

// @route   POST api/users/portrait
// @access  private
router.post("/portrait", usersController.updateUserPortrait);

// @route   POST api/users
// @access  private
router.delete("/", auth, usersController.deleteUser);

module.exports = router;
