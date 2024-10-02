import PostType, { IPostType } from '../models/PostType';
import { Document } from 'mongoose';

// Create a new post type
export const createPostType = async (name: string): Promise<IPostType> => {
  const postType = new PostType({
    name,
    posts: []
  });

  return await postType.save();
};

// Get all post types
export const getAllPostTypes = async (): Promise<IPostType[]> => {
  return await PostType.find().sort({ name: 1 });
};

// Get a specific post type by ID
export const getPostTypeById = async (postTypeId: string): Promise<IPostType | null> => {
  return await PostType.findById(postTypeId);
};

// Update a post type
export const updatePostType = async (postTypeId: string, name: string): Promise<IPostType | null> => {
  return await PostType.findByIdAndUpdate(
    postTypeId,
    { name },
    { new: true }
  );
};

// Delete a post type
export const deletePostType = async (postTypeId: string): Promise<Document | null> => {
  return await PostType.findByIdAndDelete(postTypeId);
};

// Add a post to a post type
export const addPostToPostType = async (postTypeId: string, postId: string): Promise<IPostType | null> => {
  return await PostType.findByIdAndUpdate(
    postTypeId,
    { $addToSet: { posts: postId } },
    { new: true }
  );
};

// Remove a post from a post type
export const removePostFromPostType = async (postTypeId: string, postId: string): Promise<IPostType | null> => {
  return await PostType.findByIdAndUpdate(
    postTypeId,
    { $pull: { posts: postId } },
    { new: true }
  );
};