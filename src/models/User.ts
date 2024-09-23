import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Define an interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  likes: number; // Array of Post IDs liked by the user
  posts: string[]; // Array of Post IDs created by the user
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export enum Role {
  ADMIN = "ADMIN",
  BLOG_WRITER = "blog_writer",
  USER = "user",
}

// Define User Schema
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "blog_writer", "user"],
      default: "user",
    },
    likes: {
      type: Number,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }], // Reference to posts created by the user
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Encrypt password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user-entered password to the hashed password
UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
