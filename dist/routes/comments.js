"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = require("../services/comments");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// All routes are protected and require blogger role
router.post("/", authMiddleware_1.protect, authMiddleware_1.blogger, comments_1.createComment);
router.get("/post/:postId", authMiddleware_1.protect, authMiddleware_1.blogger, comments_1.getCommentsByPostId);
router.get("/:id", authMiddleware_1.protect, authMiddleware_1.blogger, comments_1.getCommentById);
router.put("/:id", authMiddleware_1.protect, authMiddleware_1.blogger, comments_1.updateComment);
router.delete("/:id", authMiddleware_1.protect, authMiddleware_1.blogger, comments_1.deleteComment);
exports.default = router;
