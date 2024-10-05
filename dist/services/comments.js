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
exports.deleteComment = exports.updateComment = exports.getCommentById = exports.getCommentsByPostId = exports.createComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
// Create a new comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = new Comment_1.default(req.body);
        yield comment.save();
        return res.status(201).json(comment);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error creating comment",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.createComment = createComment;
// Get all comments for a specific post
const getCommentsByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const comments = yield Comment_1.default.find({ post: postId }).populate('user');
        return res.status(201).json(comments);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching comments",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.getCommentsByPostId = getCommentsByPostId;
// Get a single comment by ID
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comment = yield Comment_1.default.findById(id).populate('user');
        if (comment) {
            return res.status(201).json(comment);
        }
        else {
            return res.status(200).json({ message: "Comment not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching comment",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.getCommentById = getCommentById;
// Update a comment by ID
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedComment = yield Comment_1.default.findByIdAndUpdate(id, req.body, { new: true }).populate('user');
        if (updatedComment) {
            return res.status(201).json(updatedComment);
        }
        else {
            return res.status(200).json({ message: "Comment not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error updating comment",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.updateComment = updateComment;
// Delete a comment by ID
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedComment = yield Comment_1.default.findByIdAndDelete(id);
        if (deletedComment) {
            return res.status(201).json({ message: "Comment deleted successfully" });
        }
        else {
            return res.status(200).json({ message: "Comment not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error deleting comment",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.deleteComment = deleteComment;
