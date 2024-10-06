import { Request, Response } from "express";
import Post, { IPost } from "../models/Post";
import User from "../models/User";
import PostType from "../models/PostType";

// Create a new post
export const createPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const post = new Post(req.body);
    // TODO: Upload image to cloudinary
    await post.save();
    const author = await User.findById(post.author);
    author?.posts?.push(post._id);
    author?.save();

    const postType = await PostType.findById(post.type);
    postType?.posts?.push(post._id);
    postType?.save();

    return res.status(201).json(post);
  } catch (err) {
    return res.status(200).json({
      message: "Error creating post",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Get all posts
export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author")
      .skip(req.body.start)
      .limit(req.body.limit);
    return res.status(201).json(posts);
  } catch (err) {
    return res.status(200).json({
      message: "Error fetching posts",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const getAllPostsByAuthor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const posts = await Post.find({ author: req.params.authorId })
      .populate("author")
      .skip(req.body.start)
      .limit(req.body.limit);
    return res.status(201).json(posts);
  } catch (err) {
    return res.status(200).json({
      message: "Error fetching posts",
    });
  }
};

export const getAllPostsByType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const posts = await Post.find({ type: req.params.typeId })
      .populate("author")
      .skip(req.body.start)
      .limit(req.body.limit);
    return res.status(201).json(posts);
  } catch (err) {
    return res.status(200).json({
      message: "Error fetching posts",
    });
  }
};

// Get a single post by ID
export const getPostById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    if (post) {
      return res.status(201).json(post);
    } else {
      return res.status(200).json({ message: "Post not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error fetching post",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Update a post by ID
export const updatePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("author");
    if (updatedPost) {
      return res.status(201).json(updatedPost);
    } else {
      return res.status(200).json({ message: "Post not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error updating post",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const likePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    const author = await User.findById(post?.author);

    if (post) {
      post.likes += 1;
      await post.save();
      user?.likedPosts?.push(post._id);
      await user?.save();

      if (author) {
        author.likes += 1;
        await author?.save();
      } else {
        return res.status(200).json({ message: "Author not found" });
      }
      return res.status(201).json(post);
    } else {
      return res.status(200).json({ message: "Post not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error liking post",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Delete a post by ID
export const deletePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      return res.status(201).json({ message: "Post deleted successfully" });
    } else {
      return res.status(200).json({ message: "Post not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Error deleting post",
      error: err instanceof Error ? err.message : err,
    });
  }
};
