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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.authUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
// Generate JWT Token
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
// Register new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, profilePicture } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }
        // Create new user
        const user = new User_1.default({
            name,
            email,
            password,
            profilePicture,
        });
        // Save user to database
        yield user.save();
        // Return user data
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            profilePicture: user.profilePicture,
            email: user.email,
            role: user.role,
            likes: user.likes,
            posts: user.posts,
            followers: user.followers,
            following: user.following,
            notifications: user.notifications,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token: generateToken(user._id, user.role),
        });
    }
    catch (err) {
        return res.status(200).json({ message: "Server error" });
    }
});
exports.registerUser = registerUser;
// Authenticate user (login)
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = yield User_1.default.findOne({ email }).populate("posts"); // Populate posts created by the user
        if (user && (yield user.matchPassword(password))) {
            // Return user data if password matches
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                likes: user.likes,
                posts: user.posts,
                followers: user.followers,
                following: user.following,
                notifications: user.notifications,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token: generateToken(user._id, user.role),
            });
        }
        else {
            return res.status(200).json({ message: "Invalid email or password" });
        }
    }
    catch (err) {
        return res.status(200).json({ message: "Server error" });
    }
});
exports.authUser = authUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bloggers = yield User_1.default.find({ role: "blogger" }).populate("posts");
        return res.status(201).json(bloggers);
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching bloggers",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getAllUsers = getAllUsers;
// Get a single blogger by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogger = yield User_1.default.findById(req.params.id).populate("posts");
        if (blogger) {
            return res.status(201).json(blogger);
        }
        else {
            return res.status(200).json({ message: "User not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error fetching blogger",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getUserById = getUserById;
// Update a blogger by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).populate("posts");
        if (updatedUser) {
            return res.status(201).json(updatedUser);
        }
        else {
            return res.status(200).json({ message: "User not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error updating blogger",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.updateUser = updateUser;
// Delete a blogger by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            return res.status(201).json({ message: "User deleted successfully" });
        }
        else {
            return res.status(200).json({ message: "User not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Error deleting blogger",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.deleteUser = deleteUser;
