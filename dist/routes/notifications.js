"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifications_1 = require("../services/notifications");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Protected routes
router.post("/", authMiddleware_1.protect, authMiddleware_1.blogger, notifications_1.createNotification);
router.get("/:userId", authMiddleware_1.protect, authMiddleware_1.blogger, notifications_1.getUserNotifications);
router.put("/read/:notificationId", authMiddleware_1.protect, authMiddleware_1.blogger, notifications_1.markAsRead);
router.put("/read-all/:userId", authMiddleware_1.protect, authMiddleware_1.blogger, notifications_1.markAllAsRead);
router.delete("/:notificationId", authMiddleware_1.protect, authMiddleware_1.blogger, notifications_1.deleteNotification);
exports.default = router;
