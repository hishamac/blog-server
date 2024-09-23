import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User, { IUser } from '../models/User';

dotenv.config();

// Generate JWT Token
const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
};

// Register new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create new user
    const user: IUser = new User({
      name,
      email,
      password,
      role
    });

    // Save user to database
    await user.save();

    // Return user data
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      likes: user.likes, // Include likes array
      posts: user.posts, // Include posts array
      createdAt: user.createdAt, // Automatically handled by Mongoose
      updatedAt: user.updatedAt, // Automatically handled by Mongoose
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Authenticate user (login)
export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email }).populate('posts'); // Populate posts created by the user

    if (user && (await user.matchPassword(password))) {
      // Return user data if password matches
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        likes: user.likes, // Include likes array
        posts: user.posts, // Include posts array
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: generateToken(user._id, user.role)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
