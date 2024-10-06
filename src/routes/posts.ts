import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getAllPostsByType,
  getAllPostsByAuthor,
  likePost,
} from "../services/posts";
import { protect, blogger } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllPosts);
router.get("/types/:typeId", getAllPostsByType);
router.get("/authors/:authorId", getAllPostsByAuthor);
router.get("/:id", getPostById);

router.post("/like/:id", protect, blogger, likePost);
router.post("/", protect, blogger, createPost);
router.put("/:id", protect, blogger, updatePost);
router.delete("/:id", protect, blogger, deletePost);

export default router;
