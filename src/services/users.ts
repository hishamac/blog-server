import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User, { IUser } from "../models/User";

dotenv.config();

// Generate JWT Token
const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

// Register new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, password, profilePicture } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // Create new user
    const user: IUser = new User({
      name,
      email,
      password,
      profilePicture,
    });

    // Save user to database
    await user.save();

    // Return user data
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      profilePicture: user.profilePicture,
      email: user.email,
      role: user.role,
      likes: user.likes, // Include likes array
      posts: user.posts, // Include posts array
      followers: user.followers,
      following: user.following,
      notifications: user.notifications,
      createdAt: user.createdAt, // Automatically handled by Mongoose
      updatedAt: user.updatedAt, // Automatically handled by Mongoose
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    return res.status(200).json({ message: "Server error" });
  }
};

// Authenticate user (login)
export const authUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email }).populate("posts"); // Populate posts created by the user

    if (user && (await user.matchPassword(password))) {
      // Return user data if password matches
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        likes: user.likes, // Include likes array
        posts: user.posts, // Include posts array
        followers: user.followers,
        following: user.following,
        notifications: user.notifications,
        createdAt: user.createdAt, // Automatically handled by Mongoose
        updatedAt: user.updatedAt, // Automatically handled by Mongoose
        token: generateToken(user._id, user.role),
      });
    } else {
      return res.status(200).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    return res.status(200).json({ message: "Server error" });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const bloggers = await User.find({ role: "blogger" }).populate("posts");
    return res.status(201).json(bloggers);
  } catch (err) {
    return res.status(200).json({
      message: "Error fetching bloggers",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Get a single blogger by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const blogger = await User.findById(req.params.id).populate("posts");
    if (blogger) {
      return res.status(201).json(blogger);
    } else {
      return res.status(200).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error fetching blogger",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Update a blogger by ID
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("posts");
    if (updatedUser) {
      return res.status(201).json(updatedUser);
    } else {
      return res.status(200).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error updating blogger",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Delete a blogger by ID
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      return res.status(201).json({ message: "User deleted successfully" });
    } else {
      return res.status(200).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error deleting blogger",
      error: err instanceof Error ? err.message : err,
    });
  }
};
