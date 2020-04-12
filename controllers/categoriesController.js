const { validationResult } = require("express-validator");
const Category = require("../models/Category");

// @desc    Create a category
exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newCategory = new Category({
      name: req.body.name,
    });

    const category = await newCategory.save();
    res.json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get all category
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ date: -1 });
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Delete category by Id
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ msg: "Category Not Found" });

    await category.remove();
    res.json({ msg: "Category removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") return res.status(404).json({ msg: "Category Not Found" });
    res.status(500).send("Server Error");
  }
};
