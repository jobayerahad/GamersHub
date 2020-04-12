const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");

const categoriesController = require("../../controllers/categoriesController");

// @route   POST api/categories
// @access  Private
router.post(
  "/",
  [auth, [check("name", "Category name is required").not().isEmpty()]],
  categoriesController.createCategory
);

// @route   GET api/categories
// @access  Public
router.get("/", categoriesController.getCategories);

// @route   DELETE api/categories/:id
// @access  Private
router.delete("/:id", auth, categoriesController.deleteCategory);

module.exports = router;
