import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../services/posts";

import { protect, admin, blogger } from "../middlewares/authMiddleware";

const router = express.Router();

// Create a new post
router.post("/", protect, blogger, async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Get all posts
router.get("/", protect, blogger, async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Get a single post by ID
router.get("/:id", protect, blogger, async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Update a post by ID
router.put("/:id", protect, blogger, async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post by ID
router.delete("/:id", protect, blogger, async (req, res) => {
  try {
    const deletedPost = await deletePost(req.params.id);
    if (deletedPost) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

export default router;
