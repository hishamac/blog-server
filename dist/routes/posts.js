"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = require("../services/posts");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", posts_1.getAllPosts);
router.get("/types/:typeId", posts_1.getAllPostsByType);
router.get("/authors/:authorId", posts_1.getAllPostsByAuthor);
router.get("/:id", posts_1.getPostById);
router.post("/like/:id", authMiddleware_1.protect, authMiddleware_1.blogger, posts_1.likePost);
router.post("/", authMiddleware_1.protect, authMiddleware_1.blogger, posts_1.createPost);
router.put("/:id", authMiddleware_1.protect, authMiddleware_1.blogger, posts_1.updatePost);
router.delete("/:id", authMiddleware_1.protect, authMiddleware_1.blogger, posts_1.deletePost);
exports.default = router;
