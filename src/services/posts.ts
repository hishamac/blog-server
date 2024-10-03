import { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const post = new Post(req.body);
    // TODO: Upload image to cloudinary
    await post.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ 
      message: "Error creating post",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const posts = await Post.find().populate('author');
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ 
      message: "Error fetching posts",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const post = await Post.findById(req.params.id).populate('author');
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    return res.status(500).json({ 
      message: "Error fetching post",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author');
    if (updatedPost) {
      return res.status(200).json(updatedPost);
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    return res.status(500).json({ 
      message: "Error updating post",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    return res.status(500).json({ 
      message: "Error deleting post",
      error: err instanceof Error ? err.message : err
    });
  }
};