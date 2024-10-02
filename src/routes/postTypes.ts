import express, { Request, Response } from "express";
import {
  createPostType,
  getAllPostTypes,
  getPostTypeById,
  updatePostType,
  deletePostType,
  addPostToPostType,
  removePostFromPostType,
} from "../services/postTypes";

import { protect, blogger } from "../middlewares/authMiddleware";

const router = express.Router();

// Create a new post type
router.post("/", protect, blogger, async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const postType = await createPostType(name);
    res.status(201).json(postType);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Get all post types
router.get("/", protect, async (req: Request, res: Response) => {
  try {
    const postTypes = await getAllPostTypes();
    res.status(200).json(postTypes);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Get a specific post type by ID
router.get("/:postTypeId", protect, async (req: Request, res: Response) => {
  const { postTypeId } = req.params;

  try {
    const postType = await getPostTypeById(postTypeId);
    if (postType) {
      res.status(200).json(postType);
    } else {
      res.status(404).json({ message: "Post type not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Update a post type
router.put("/:postTypeId", protect, blogger, async (req: Request, res: Response) => {
  const { postTypeId } = req.params;
  const { name } = req.body;

  try {
    const updatedPostType = await updatePostType(postTypeId, name);
    if (updatedPostType) {
      res.status(200).json(updatedPostType);
    } else {
      res.status(404).json({ message: "Post type not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Delete a post type
router.delete("/:postTypeId", protect, blogger, async (req: Request, res: Response) => {
  const { postTypeId } = req.params;

  try {
    const deletedPostType = await deletePostType(postTypeId);
    if (deletedPostType) {
      res.status(200).json({ message: "Post type deleted successfully" });
    } else {
      res.status(404).json({ message: "Post type not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Add a post to a post type
router.post("/:postTypeId/posts", protect, blogger, async (req: Request, res: Response) => {
  const { postTypeId } = req.params;
  const { postId } = req.body;

  try {
    const updatedPostType = await addPostToPostType(postTypeId, postId);
    if (updatedPostType) {
      res.status(200).json(updatedPostType);
    } else {
      res.status(404).json({ message: "Post type not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Remove a post from a post type
router.delete("/:postTypeId/posts/:postId", protect, blogger, async (req: Request, res: Response) => {
  const { postTypeId, postId } = req.params;

  try {
    const updatedPostType = await removePostFromPostType(postTypeId, postId);
    if (updatedPostType) {
      res.status(200).json(updatedPostType);
    } else {
      res.status(404).json({ message: "Post type or post not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

export default router;