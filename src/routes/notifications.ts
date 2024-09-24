import express, { Request, Response } from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notifications";

import { protect, blogger } from "../middlewares/authMiddleware";

const router = express.Router();

// Create a new notification (Admin or System triggered)
router.post("/", protect, blogger, async (req: Request, res: Response) => {
  const { recipients, type, message, postId } = req.body;

  try {
    const notification = await createNotification(
      recipients,
      type,
      message,
      postId
    );
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
});

// Get notifications for a user
router.get(
  "/:userId",
  protect,
  blogger,
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const notifications = await getUserNotifications(userId);
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({
        message: "Server error",
        error: err instanceof Error ? err.message : err,
      });
    }
  }
);

// Mark a single notification as read for a specific user
router.put(
  "/read/:notificationId",
  protect,
  blogger,
  async (req: Request, res: Response) => {
    const { notificationId } = req.params;
    const { userId } = req.body; // Pass the userId in the request body

    try {
      const updatedNotification = await markAsRead(notificationId, userId);
      if (updatedNotification) {
        res.status(200).json(updatedNotification);
      } else {
        res
          .status(404)
          .json({ message: "Notification not found or user not a recipient" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Server error",
        error: err instanceof Error ? err.message : err,
      });
    }
  }
);

// Mark all notifications as read for a specific user
router.put(
  "/read-all/:userId",
  protect,
  blogger,
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const result = await markAllAsRead(userId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        message: "Server error",
        error: err instanceof Error ? err.message : err,
      });
    }
  }
);

// Delete a notification
router.delete(
  "/:notificationId",
  protect,
  blogger,
  async (req: Request, res: Response) => {
    const { notificationId } = req.params;

    try {
      const deletedNotification = await deleteNotification(notificationId);
      if (deletedNotification) {
        res.status(200).json({ message: "Notification deleted successfully" });
      } else {
        res.status(404).json({ message: "Notification not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);

export default router;
