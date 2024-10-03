import { Router } from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notifications";
import { protect, blogger } from "../middlewares/authMiddleware";

const router = Router();

// Protected routes
router.post("/", protect, blogger, createNotification);
router.get("/:userId", protect, blogger, getUserNotifications);
router.put("/read/:notificationId", protect, blogger, markAsRead);
router.put("/read-all/:userId", protect, blogger, markAllAsRead);
router.delete("/:notificationId", protect, blogger, deleteNotification);

export default router;