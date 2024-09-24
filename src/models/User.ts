import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Enum for user roles
export enum Role {
  ADMIN = "admin",
  BLOGGER = "blogger",
}

// Define an interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  likes: number; // Number of posts liked by the user
  posts: mongoose.Schema.Types.ObjectId[]; // Array of Post IDs created by the user
  followers: mongoose.Schema.Types.ObjectId[]; // Array of User IDs following this user
  following: mongoose.Schema.Types.ObjectId[]; // Array of User IDs this user is following
  notifications: mongoose.Schema.Types.ObjectId[]; // Array of notifications
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Define User Schema
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String, // Set as String type
      enum: Object.values(Role), // Use enum to restrict values
      default: Role.BLOGGER,
    },
    likes: {
      type: Number,
      default: 0, // Initialize likes to 0
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }], // Reference to posts created by the user
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Reference to users following this user
    following: [{ type: Schema.Types.ObjectId, ref: "User" }], // Reference to users this user is following
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Encrypt password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
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