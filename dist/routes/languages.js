"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const languages_1 = require("../services/languages");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.get("/", languages_1.getAllLanguages);
router.get("/:languageId", languages_1.getLanguageById);
// Protected routes
router.post("/", authMiddleware_1.protect, authMiddleware_1.blogger, languages_1.createLanguage);
router.put("/:languageId", authMiddleware_1.protect, authMiddleware_1.blogger, languages_1.updateLanguage);
router.delete("/:languageId", authMiddleware_1.protect, authMiddleware_1.blogger, languages_1.deleteLanguage);
router.post("/:languageId/posts", authMiddleware_1.protect, authMiddleware_1.blogger, languages_1.addPostToLanguage);
router.delete("/:languageId/posts/:postId", authMiddleware_1.protect, authMiddleware_1.blogger, languages_1.removePostFromLanguage);
exports.default = router;
