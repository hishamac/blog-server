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

router.get("/", getAllPosts);
router.get("/:id", getPostById);

router.post("/", protect, blogger, createPost);
router.put("/:id", protect, blogger, updatePost);
router.delete("/:id", protect, blogger, deletePost);

export default router;
