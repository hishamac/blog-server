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
exports.deletePost = exports.likePost = exports.updatePost = exports.getPostById = exports.getAllPostsByType = exports.getAllPostsByAuthor = exports.getAllPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const PostType_1 = __importDefault(require("../models/PostType"));
// Create a new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const post = new Post_1.default(req.body);
        // TODO: Upload image to cloudinary
        yield post.save();
        const author = yield User_1.default.findById(post.author);
        (_a = author === null || author === void 0 ? void 0 : author.posts) === null || _a === void 0 ? void 0 : _a.push(post._id);
        author === null || author === void 0 ? void 0 : author.save();
        const postType = yield PostType_1.default.findById(post.type);
        (_b = postType === null || postType === void 0 ? void 0 : postType.posts) === null || _b === void 0 ? void 0 : _b.push(post._id);
        postType === null || postType === void 0 ? void 0 : postType.save();
        return res.status(201).json(post);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error creating post",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.createPost = createPost;
// Get all posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find()
            .sort({ createdAt: -1 })
            .populate("author")
            .skip(req.body.start)
            .limit(req.body.limit);
        return res.status(201).json(posts);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching posts",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getAllPosts = getAllPosts;
const getAllPostsByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find({ author: req.params.authorId })
            .populate("author")
            .skip(req.body.start)
            .limit(req.body.limit);
        return res.status(201).json(posts);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching posts",
        });
    }
});
exports.getAllPostsByAuthor = getAllPostsByAuthor;
const getAllPostsByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find({ type: req.params.typeId })
            .populate("author")
            .skip(req.body.start)
            .limit(req.body.limit);
        return res.status(201).json(posts);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching posts",
        });
    }
});
exports.getAllPostsByType = getAllPostsByType;
// Get a single post by ID
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id).populate("author");
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
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getPostById = getPostById;
// Update a post by ID
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield Post_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).populate("author");
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
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.updatePost = updatePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const post = yield Post_1.default.findById(req.params.id);
        const user = yield User_1.default.findById(req.body.userId);
        const author = yield User_1.default.findById(post === null || post === void 0 ? void 0 : post.author);
        if (post) {
            post.likes += 1;
            yield post.save();
            (_c = user === null || user === void 0 ? void 0 : user.likedPosts) === null || _c === void 0 ? void 0 : _c.push(post._id);
            yield (user === null || user === void 0 ? void 0 : user.save());
            if (author) {
                author.likes += 1;
                yield (author === null || author === void 0 ? void 0 : author.save());
            }
            else {
                return res.status(200).json({ message: "Author not found" });
            }
            return res.status(201).json(post);
        }
        else {
            return res.status(200).json({ message: "Post not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error liking post",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.likePost = likePost;
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
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.deletePost = deletePost;
