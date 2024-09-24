import Comment, { IComment } from '../models/Comment';

// Create a new comment
export const createComment = async (commentData: Partial<IComment>): Promise<IComment> => {
  const comment = new Comment(commentData);
  return await comment.save();
};

// Get all comments for a specific post
export const getCommentsByPostId = async (postId: string): Promise<IComment[]> => {
  return await Comment.find({ post: postId }).populate('user'); // Populate user for additional user details
};

// Get a single comment by ID
export const getCommentById = async (commentId: string): Promise<IComment | null> => {
  return await Comment.findById(commentId).populate('user');
};

// Update a comment by ID
export const updateComment = async (commentId: string, commentData: Partial<IComment>): Promise<IComment | null> => {
  return await Comment.findByIdAndUpdate(commentId, commentData, { new: true }).populate('user');
};

// Delete a comment by ID
export const deleteComment = async (commentId: string): Promise<IComment | null> => {
  return await Comment.findByIdAndDelete(commentId);
};
