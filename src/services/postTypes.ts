import { Request, Response } from "express";
import PostType, { IPostType } from "../models/PostType";

// Create a new post type
export const createPostType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.body;
  try {
    const postType = new PostType({ name, posts: [] });
    await postType.save();
    return res.status(201).json(postType);
  } catch (err) {
    return res.status(200).json({
      message: "Error creating post type",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Get all post types
export const getAllPostTypes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const postTypes = await PostType.find().sort({ name: 1 });
    return res.status(201).json(postTypes);
  } catch (err) {
    return res.status(200).json({
      message: "Error fetching post types",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Get a specific post type by ID
export const getPostTypeById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const postType = await PostType.findById(req.params.postTypeId);
    if (postType) {
      return res.status(201).json(postType);
    } else {
      return res.status(200).json({ message: "Post type not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error fetching post type",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Update a post type
export const updatePostType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.body;
  try {
    const updatedPostType = await PostType.findByIdAndUpdate(
      req.params.postTypeId,
      { name },
      { new: true }
    );
    if (updatedPostType) {
      return res.status(201).json(updatedPostType);
    } else {
      return res.status(200).json({ message: "Post type not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error updating post type",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Delete a post type
export const deletePostType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedPostType = await PostType.findByIdAndDelete(
      req.params.postTypeId
    );
    if (deletedPostType) {
      return res
        .status(201)
        .json({ message: "Post type deleted successfully" });
    } else {
      return res.status(200).json({ message: "Post type not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error deleting post type",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Add a post to a post type
export const addPostToPostType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { postId } = req.body;
  try {
    const updatedPostType = await PostType.findByIdAndUpdate(
      req.params.postTypeId,
      { $addToSet: { posts: postId } },
      { new: true }
    );
    if (updatedPostType) {
      return res.status(201).json(updatedPostType);
    } else {
      return res.status(200).json({ message: "Post type not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error adding post to post type",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Remove a post from a post type
export const removePostFromPostType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedPostType = await PostType.findByIdAndUpdate(
      req.params.postTypeId,
      { $pull: { posts: req.params.postId } },
      { new: true }
    );
    if (updatedPostType) {
      return res.status(201).json(updatedPostType);
    } else {
      return res.status(200).json({ message: "Post type or post not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error removing post from post type",
      error: err instanceof Error ? err.message : err,
    });
  }
};
