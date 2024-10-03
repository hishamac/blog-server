import { Router } from "express";
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

const router = Router();

router.post("/", protect, blogger, createPostType);
router.get("/", protect, getAllPostTypes);
router.get("/:postTypeId", protect, getPostTypeById);
router.put("/:postTypeId", protect, blogger, updatePostType);
router.delete("/:postTypeId", protect, blogger, deletePostType);
router.post("/:postTypeId/posts", protect, blogger, addPostToPostType);
router.delete(
  "/:postTypeId/posts/:postId",
  protect,
  blogger,
  removePostFromPostType
);

export default router;
