const { validationResult } = require("express-validator");
const User = require("../models/User");
const Topic = require("../models/Topic");

// @desc    Create a topic
exports.createTopic = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newTopic = new Topic({
      title: req.body.title,
      text: req.body.text,
      category: req.body.category,
      tags: req.body.tags,
      username: user.username,
      portrait: user.portrait,
      user: req.user.id,
    });

    const topic = await newTopic.save();
    res.json(topic);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get all topic
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().select(["-text", "-likes"]).sort({ date: -1 });
    res.json(topics);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get topic by Id
exports.getTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ msg: "Topic Not Found" });

    res.json(topic);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") return res.status(404).json({ msg: "Topic Not Found" });
    res.status(500).send("Server Error");
  }
};

// @desc    Delete topic by Id
exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) return res.status(404).json({ msg: "Topic Not Found" });
    // Check user
    if (topic.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });

    await topic.remove();
    res.json({ msg: "Topic removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") return res.status(404).json({ msg: "Topic Not Found" });
    res.status(500).send("Server Error");
  }
};

// @desc    Like topic by Id
exports.likeTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    // Check if the topic has already been liked by this user
    if (topic.likes.filter((like) => like.user.toString() === req.user.id).length > 0)
      return res.status(400).json({ msg: "Topic already liked" });

    topic.likes.unshift({ user: req.user.id });

    await topic.save();

    res.json(topic.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") return res.status(404).json({ msg: "Topic Not Found" });
    res.status(500).send("Server Error");
  }
};

// @desc    Unlike topic by Id
exports.unlikeTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    // Check if the topic has already been liked by this user
    if (topic.likes.filter((like) => like.user.toString() === req.user.id).length === 0)
      return res.status(400).json({ msg: "Topic has not yet been liked" });

    // Get remove index
    const removeIndex = topic.likes.map((like) => like.user.toString()).indexOf(req.user.id);
    topic.likes.splice(removeIndex, 1);

    await topic.save();

    res.json(topic.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") return res.status(404).json({ msg: "Topic Not Found" });
    res.status(500).send("Server Error");
  }
};

// @desc    Reply on a topic
exports.createReply = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.user.id).select("-password");
    const topic = await Topic.findById(req.params.id);

    const newReply = {
      text: req.body.text,
      username: user.username,
      portrait: user.portrait,
      user: req.user.id,
    };

    topic.replies.unshift(newReply);
    await topic.save();
    res.json(topic.replies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Delete reply by Id
exports.deleteReply = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    // Make sure topic exists
    if (!topic) return res.status(404).json({ msg: "Topic Not Found" });

    // Pull out reply
    const reply = topic.replies.find((reply) => reply.id === req.params.reply_id);

    // Make sure reply exists
    if (!reply) return res.status(404).json({ msg: "Reply Does Not Exists" });

    // Check user
    if (topic.user.toString() !== req.user.id || reply.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });

    // Get remove index
    const removeIndex = topic.replies.map((reply) => reply.user.toString()).indexOf(req.user.id);
    topic.replies.splice(removeIndex, 1);

    await topic.save();

    res.json(topic.replies);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") return res.status(404).json({ msg: "Topic Not Found" });
    res.status(500).send("Server Error");
  }
};
