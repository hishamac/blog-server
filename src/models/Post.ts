import mongoose, { Document, Schema } from "mongoose";

// Enum for post types
export enum PostType {
  BLOG = "blog",
  ARTICLE = "article",
  TUTORIAL = "tutorial",
  REVIEW = "review",
}

// Enum for post statuses
export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

// Define an interface for Post
export interface IPost extends Document {
  author: mongoose.Schema.Types.ObjectId; // Reference to the User model
  likes: number; // Number of likes on the post
  comments: mongoose.Schema.Types.ObjectId[]; // Array of comments
  title: string; // Title of the post
  description: string; // Short description of the post
  content: string; // Main content of the post
  type: PostType; // Type of the post (blog, article, etc.)
  collaborators: mongoose.Schema.Types.ObjectId[]; // Collaborators on the post
  imageUrl: string; // URL of the post image
  status: PostStatus; // Status of the post
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for updates
}

// Define the Post Schema
const PostSchema: Schema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    likes: { type: Number, default: 0 }, // Default number of likes
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    title: { type: String, required: true }, // Title of the post
    description: { type: String, required: true }, // Short description of the post
    content: { type: String, required: true }, // Main content of the post
    type: { type: String, enum: Object.values(PostType), required: true }, // Type of the post
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String, // Use "String" type instead of "PostStatus"
      enum: Object.values(PostStatus), // Allowed values from PostStatus enum
      default: PostStatus.DRAFT, // Default value
    },
    imageUrl: { type: String }, // URL of the post image
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Post model
export default mongoose.model<IPost>("Post", PostSchema);
