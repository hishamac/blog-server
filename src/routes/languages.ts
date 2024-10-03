import { Router } from "express";
import {
  createLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
  addPostToLanguage,
  removePostFromLanguage,
} from "../services/languages";
import { protect, blogger } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.get("/", getAllLanguages);
router.get("/:languageId", getLanguageById);

// Protected routes
router.post("/", protect, blogger, createLanguage);
router.put("/:languageId", protect, blogger, updateLanguage);
router.delete("/:languageId", protect, blogger, deleteLanguage);
router.post("/:languageId/posts", protect, blogger, addPostToLanguage);
router.delete(
  "/:languageId/posts/:postId",
  protect,
  blogger,
  removePostFromLanguage
);

export default router;
