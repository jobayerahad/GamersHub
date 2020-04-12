const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");

const topicsController = require("../../controllers/topicsController");

// @route   POST api/topics
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Please provide proper description").not().isEmpty(),
      check("title", "Topic title is required").not().isEmpty(),
      check("category", "Topic category is required").not().isEmpty(),
    ],
  ],
  topicsController.createTopic
);

// @route   GET api/topics
// @access  Public
router.get("/", topicsController.getTopics);

// @route   GET api/topics/:id
// @access  Public
router.get("/:id", topicsController.getTopic);

// @route   DELETE api/topics/:id
// @access  Private
router.delete("/:id", auth, topicsController.deleteTopic);

// @route   PUT api/topics/like/:id
// @access  Private
router.put("/like/:id", auth, topicsController.likeTopic);

// @route   PUT api/topics/unlike/:id
// @access  Private
router.put("/unlike/:id", auth, topicsController.unlikeTopic);

// @route   POST api/topics/reply/:id
// @access  Private
router.post(
  "/reply/:id",
  [auth, [check("text", "Reply text is required").not().isEmpty()]],
  topicsController.createReply
);

// @route   DELETE api/topics/reply/:id/:reply_id
// @access  Private
router.delete("/reply/:id/:reply_id", auth, topicsController.deleteReply);

module.exports = router;
