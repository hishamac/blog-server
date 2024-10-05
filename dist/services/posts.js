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
exports.deletePost = exports.updatePost = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
// Create a new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new Post_1.default(req.body);
        // TODO: Upload image to cloudinary
        yield post.save();
        return res.status(201).json(post);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error creating post",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.createPost = createPost;
// Get all posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find().populate('author');
        return res.status(201).json(posts);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching posts",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.getAllPosts = getAllPosts;
// Get a single post by ID
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id).populate('author');
        if (post) {
            return res.status(201).json(post);
        }
        else {
            return res.status(200).json({ message: "Post not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching post",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.getPostById = getPostById;
// Update a post by ID
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield Post_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author');
        if (updatedPost) {
            return res.status(201).json(updatedPost);
        }
        else {
            return res.status(200).json({ message: "Post not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error updating post",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.updatePost = updatePost;
// Delete a post by ID
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield Post_1.default.findByIdAndDelete(req.params.id);
        if (deletedPost) {
            return res.status(201).json({ message: "Post deleted successfully" });
        }
        else {
            return res.status(200).json({ message: "Post not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error deleting post",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.deletePost = deletePost;
