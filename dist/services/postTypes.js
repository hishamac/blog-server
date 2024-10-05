"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePostFromPostType = exports.addPostToPostType = exports.deletePostType = exports.updatePostType = exports.getPostTypeById = exports.getAllPostTypes = exports.createPostType = void 0;
const PostType_1 = __importDefault(require("../models/PostType"));
// Create a new post type
const createPostType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const postType = new PostType_1.default({ name, posts: [] });
        yield postType.save();
        return res.status(201).json(postType);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error creating post type",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.createPostType = createPostType;
// Get all post types
const getAllPostTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postTypes = yield PostType_1.default.find().sort({ name: 1 });
        return res.status(201).json(postTypes);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching post types",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getAllPostTypes = getAllPostTypes;
// Get a specific post type by ID
const getPostTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postType = yield PostType_1.default.findById(req.params.postTypeId);
        if (postType) {
            return res.status(201).json(postType);
        }
        else {
            return res.status(200).json({ message: "Post type not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching post type",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getPostTypeById = getPostTypeById;
// Update a post type
const updatePostType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const updatedPostType = yield PostType_1.default.findByIdAndUpdate(req.params.postTypeId, { name }, { new: true });
        if (updatedPostType) {
            return res.status(201).json(updatedPostType);
        }
        else {
            return res.status(200).json({ message: "Post type not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error updating post type",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.updatePostType = updatePostType;
// Delete a post type
const deletePostType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPostType = yield PostType_1.default.findByIdAndDelete(req.params.postTypeId);
        if (deletedPostType) {
            return res
                .status(201)
                .json({ message: "Post type deleted successfully" });
        }
        else {
            return res.status(200).json({ message: "Post type not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error deleting post type",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.deletePostType = deletePostType;
// Add a post to a post type
const addPostToPostType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.body;
    try {
        const updatedPostType = yield PostType_1.default.findByIdAndUpdate(req.params.postTypeId, { $addToSet: { posts: postId } }, { new: true });
        if (updatedPostType) {
            return res.status(201).json(updatedPostType);
        }
        else {
            return res.status(200).json({ message: "Post type not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error adding post to post type",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.addPostToPostType = addPostToPostType;
// Remove a post from a post type
const removePostFromPostType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPostType = yield PostType_1.default.findByIdAndUpdate(req.params.postTypeId, { $pull: { posts: req.params.postId } }, { new: true });
        if (updatedPostType) {
            return res.status(201).json(updatedPostType);
        }
        else {
            return res.status(200).json({ message: "Post type or post not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error removing post from post type",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.removePostFromPostType = removePostFromPostType;
