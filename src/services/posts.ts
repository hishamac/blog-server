import Post, { IPost } from '../models/Post';

// Create a new post
export const createPost = async (postData: Partial<IPost>): Promise<IPost> => {
  const post = new Post(postData);
  return await post.save();
};

// Get all posts
export const getAllPosts = async (): Promise<IPost[]> => {
  return await Post.find().populate('author'); // Populate author for additional user details
};

// Get a single post by ID
export const getPostById = async (postId: string): Promise<IPost | null> => {
  return await Post.findById(postId).populate('author');
};

// Update a post by ID
export const updatePost = async (postId: string, postData: Partial<IPost>): Promise<IPost | null> => {
  return await Post.findByIdAndUpdate(postId, postData, { new: true }).populate('author');
};

// Delete a post by ID
export const deletePost = async (postId: string): Promise<IPost | null> => {
  return await Post.findByIdAndDelete(postId);
};
