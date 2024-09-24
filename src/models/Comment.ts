import mongoose, { Document, Schema } from "mongoose";

// Define an interface for Comment
export interface IComment extends Document {
  text: string;
  user: mongoose.Schema.Types.ObjectId; // Reference to the User ID
  post: mongoose.Schema.Types.ObjectId; // Reference to the Post ID
  createdAt: Date;
  updatedAt: Date;
}

// Define Comment Schema
const CommentSchema: Schema = new Schema(
  {
    text: { type: String, required: true }, // Comment content
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to the Post model
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Comment model
export default mongoose.model<IComment>("Comment", CommentSchema);
