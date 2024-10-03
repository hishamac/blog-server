import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../services/posts";
import { protect, blogger } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", protect, blogger, createPost);
router.get("/", protect, blogger, getAllPosts);
router.get("/:id", protect, blogger, getPostById);
router.put("/:id", protect, blogger, updatePost);
router.delete("/:id", protect, blogger, deletePost);

export default router;
