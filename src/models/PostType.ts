import mongoose, { Document, Schema } from "mongoose";

// Define an interface for PostType
export interface IPostType extends Document {
  name: string;
  posts: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Define PostType Schema
const PostTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the PostType model
export default mongoose.model<IPostType>("PostType", PostTypeSchema);