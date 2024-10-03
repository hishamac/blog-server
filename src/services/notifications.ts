import { Request, Response } from "express";
import Notification, { INotification } from '../models/Notification';

// Create a new notification
export const createNotification = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { recipients, type, message, postId } = req.body;

  try {
    const notification = new Notification({
      recipients,
      type,
      message,
      post: postId,
      read: false
    });

    await notification.save();

    return res.status(201).json(notification);
  } catch (err) {
    return res.status(500).json({ 
      message: "Server error",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Get notifications for a user
export const getUserNotifications = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ recipients: userId }).sort({ createdAt: -1 });
    return res.status(200).json(notifications);
  } catch (err) {
    return res.status(500).json({ 
      message: "Server error",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Mark a single notification as read for a specific user
export const markAsRead = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { notificationId } = req.params;
  const { userId } = req.body;

  try {
    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipients: userId },
      { read: true },
      { new: true }
    );
    if (updatedNotification) {
      return res.status(200).json(updatedNotification);
    } else {
      return res.status(404).json({ message: "Notification not found or user not a recipient" });
    }
  } catch (err) {
    return res.status(500).json({ 
      message: "Server error",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Mark all notifications as read for a specific user
export const markAllAsRead = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;

  try {
    const result = await Notification.updateMany(
      { recipients: userId, read: false },
      { read: true }
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ 
      message: "Server error",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Delete a notification
export const deleteNotification = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { notificationId } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);
    if (deletedNotification) {
      return res.status(200).json({ message: "Notification deleted successfully" });
    } else {
      return res.status(404).json({ message: "Notification not found" });
    }
  } catch (err) {
    return res.status(500).json({ 
      message: "Server error",
      error: err instanceof Error ? err.message : err
    });
  }
};