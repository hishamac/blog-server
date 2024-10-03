import { Router } from "express";
import {
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
} from "../services/comments";
import { protect, blogger } from "../middlewares/authMiddleware";

const router = Router();

// All routes are protected and require blogger role
router.post("/", protect, blogger, createComment);
router.get("/post/:postId", protect, blogger, getCommentsByPostId);
router.get("/:id", protect, blogger, getCommentById);
router.put("/:id", protect, blogger, updateComment);
router.delete("/:id", protect, blogger, deleteComment);

export default router;
