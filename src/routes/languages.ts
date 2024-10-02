import express, { Request, Response } from "express";
import {
  createLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
  addPostToLanguage,
  removePostFromLanguage,
} from "../services/languages";
import { LanguageDirection } from "../models/Language";

import { protect, blogger } from "../middlewares/authMiddleware";

const router = express.Router();

// Create a new language
router.post("/", protect, blogger, async (req: Request, res: Response) => {
  const { name, direction } = req.body;

  try {
    const language = await createLanguage(name, direction as LanguageDirection);
    res.status(201).json(language);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Get all languages
router.get("/", protect, async (req: Request, res: Response) => {
  try {
    const languages = await getAllLanguages();
    res.status(200).json(languages);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Get a specific language by ID
router.get("/:languageId", protect, async (req: Request, res: Response) => {
  const { languageId } = req.params;

  try {
    const language = await getLanguageById(languageId);
    if (language) {
      res.status(200).json(language);
    } else {
      res.status(404).json({ message: "Language not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Update a language
router.put("/:languageId", protect, blogger, async (req: Request, res: Response) => {
  const { languageId } = req.params;
  const { name, direction } = req.body;

  try {
    const updatedLanguage = await updateLanguage(languageId, name, direction as LanguageDirection);
    if (updatedLanguage) {
      res.status(200).json(updatedLanguage);
    } else {
      res.status(404).json({ message: "Language not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Delete a language
router.delete("/:languageId", protect, blogger, async (req: Request, res: Response) => {
  const { languageId } = req.params;

  try {
    const deletedLanguage = await deleteLanguage(languageId);
    if (deletedLanguage) {
      res.status(200).json({ message: "Language deleted successfully" });
    } else {
      res.status(404).json({ message: "Language not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Add a post to a language
router.post("/:languageId/posts", protect, blogger, async (req: Request, res: Response) => {
  const { languageId } = req.params;
  const { postId } = req.body;

  try {
    const updatedLanguage = await addPostToLanguage(languageId, postId);
    if (updatedLanguage) {
      res.status(200).json(updatedLanguage);
    } else {
      res.status(404).json({ message: "Language not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Remove a post from a language
router.delete("/:languageId/posts/:postId", protect, blogger, async (req: Request, res: Response) => {
  const { languageId, postId } = req.params;

  try {
    const updatedLanguage = await removePostFromLanguage(languageId, postId);
    if (updatedLanguage) {
      res.status(200).json(updatedLanguage);
    } else {
      res.status(404).json({ message: "Language or post not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

export default router;