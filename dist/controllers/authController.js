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
exports.authUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
// Generate JWT Token
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
// Register new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Create new user
        const user = new User_1.default({
            name,
            email,
            password,
            role
        });
        // Save user to database
        yield user.save();
        // Return user data
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            likes: user.likes,
            posts: user.posts,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token: generateToken(user._id, user.role)
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
// Authenticate user (login)
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = yield User_1.default.findOne({ email }).populate('posts'); // Populate posts created by the user
        if (user && (yield user.matchPassword(password))) {
            // Return user data if password matches
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                likes: user.likes,
                posts: user.posts,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token: generateToken(user._id, user.role)
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.authUser = authUser;
