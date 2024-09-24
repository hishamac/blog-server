import express from "express";
import {
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
} from "../services/comments";

import { protect, admin, blogger } from "../middlewares/authMiddleware";

const router = express.Router();

// Create a new comment
router.post("/", protect, blogger, async (req, res) => {
  try {
    const comment = await createComment(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error creating comment" });
  }
});

// Get all comments for a specific post
router.get("/post/:postId", protect, blogger, async (req, res) => {
  try {
    const comments = await getCommentsByPostId(req.params.postId);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});

// Get a single comment by ID
router.get("/:id", protect, blogger, async (req, res) => {
  try {
    const comment = await getCommentById(req.params.id);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching comment" });
  }
});

// Update a comment by ID
router.put("/:id", protect, blogger, async (req, res) => {
  try {
    const updatedComment = await updateComment(req.params.id, req.body);
    if (updatedComment) {
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating comment" });
  }
});

// Delete a comment by ID
router.delete("/:id", protect, blogger, async (req, res) => {
  try {
    const deletedComment = await deleteComment(req.params.id);
    if (deletedComment) {
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment" });
  }
});

export default router;
