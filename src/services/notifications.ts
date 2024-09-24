import Notification, { INotification } from '../models/Notification';
import { Document } from 'mongoose';

// Create a new notification for multiple recipients
export const createNotification = async (
  recipients: string[], // Array of user IDs
  type: string,
  message: string,
  postId?: string
): Promise<INotification> => {
  const notification = new Notification({
    recipients,
    type,
    message,
    post: postId,
    read: false
  });

  return await notification.save();
};

// Get all notifications for a specific user
export const getUserNotifications = async (userId: string): Promise<INotification[]> => {
  return await Notification.find({ recipients: userId }).sort({ createdAt: -1 });
};

// Mark a single notification as read for a specific user
export const markAsRead = async (notificationId: string, userId: string): Promise<INotification | null> => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, recipients: userId },
    { read: true },
    { new: true }
  );
};

// Mark all notifications as read for a specific user
export const markAllAsRead = async (userId: string): Promise<{ acknowledged: boolean; modifiedCount: number }> => {
  return await Notification.updateMany(
    { recipients: userId, read: false },
    { read: true }
  );
};

// Delete a notification
export const deleteNotification = async (notificationId: string): Promise<Document | null> => {
  return await Notification.findByIdAndDelete(notificationId);
};
