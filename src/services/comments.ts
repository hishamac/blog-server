import { Request, Response } from "express";
import Comment, { IComment } from '../models/Comment';

// Create a new comment
export const createComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    return res.status(201).json(comment);
  } catch (err) {
    return res.status(500).json({ 
      message: "Error creating comment",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Get all comments for a specific post
export const getCommentsByPostId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ post: postId }).populate('user');
    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json({ 
      message: "Error fetching comments",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Get a single comment by ID
export const getCommentById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id).populate('user');
    if (comment) {
      return res.status(200).json(comment);
    } else {
      return res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    return res.status(500).json({ 
      message: "Error fetching comment",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Update a comment by ID
export const updateComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true }).populate('user');
    if (updatedComment) {
      return res.status(200).json(updatedComment);
    } else {
      return res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    return res.status(500).json({ 
      message: "Error updating comment",
      error: err instanceof Error ? err.message : err
    });
  }
};

// Delete a comment by ID
export const deleteComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (deletedComment) {
      return res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      return res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    return res.status(500).json({ 
      message: "Error deleting comment",
      error: err instanceof Error ? err.message : err
    });
  }
};