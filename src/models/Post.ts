import mongoose, { Document, Schema } from "mongoose";

// Define an interface for Post
export interface IPost extends Document {
  author: string; // Reference to the User model
  likes: number; // Number of likes on the post
  comments: string[]; // Array of comments
  title: string; // Title of the post
  description: string; // Short description of the post
  content: string; // Main content of the post
  type: string;
  imageUrl: string; // URL of the post image
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for updates
}

export enum PostType {
  BLOG = "blog",
  ARTICLE = "article",
  TUTORIAL = "tutorial",
  REVIEW = "review",
}

// Define Post Schema
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
    description: { type: String, required: true }, // Short description
    content: { type: String, required: true }, // Main content
    type: { type: String, enum: Object.values(PostType), required: true }, // Type of the post
    imageUrl: { type: String }, // URL of the post image
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Post model
export default mongoose.model<IPost>("Post", PostSchema);
