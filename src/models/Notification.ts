import mongoose, { Document, Schema } from "mongoose";

// Define an interface for Notification
export interface INotification extends Document {
  recipients: mongoose.Schema.Types.ObjectId[]; // The user who will receive the notification
  type: string; // Type of notification (e.g., "like", "comment", "follow")
  message: string; // Notification message or description
  post?: string; // Reference to the post, if applicable
  read: boolean; // Whether the notification has been read
  createdAt: Date;
  updatedAt: Date;
}

export enum NotificationType {
  LIKE = "like",
  COMMENT = "comment",
  FOLLOW = "follow",
  POST = "post",
}

// Define Notification Schema
const NotificationSchema: Schema = new Schema(
  {
    recipients: [{ type: Schema.Types.ObjectId, ref: "User", required: true }], // The user receiving the notification
    type: {
      type: NotificationType,
      required: true,
    },
    message: { type: String, required: true }, // Notification message (e.g., "X liked your post")
    post: { type: Schema.Types.ObjectId, ref: "Post" }, // Optional reference to the relevant post
    read: { type: Boolean, default: false }, // Marks whether the notification has been read
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Notification model
export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
