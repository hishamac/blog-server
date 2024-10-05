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
exports.removePostFromLanguage = exports.addPostToLanguage = exports.deleteLanguage = exports.updateLanguage = exports.getLanguageById = exports.getAllLanguages = exports.createLanguage = void 0;
const Language_1 = __importDefault(require("../models/Language"));
// Create a new language
const createLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, direction } = req.body;
    try {
        const language = new Language_1.default({
            name,
            direction,
            posts: [],
        });
        yield language.save();
        return res.status(201).json({
            _id: language._id,
            name: language.name,
            direction: language.direction,
            posts: language.posts,
            createdAt: language.createdAt,
            updatedAt: language.updatedAt,
        });
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.createLanguage = createLanguage;
// Get all languages
const getAllLanguages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const languages = yield Language_1.default.find().sort({ name: 1 });
        return res.status(201).json(languages);
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getAllLanguages = getAllLanguages;
// Get a specific language by ID
const getLanguageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { languageId } = req.params;
    try {
        const language = yield Language_1.default.findById(languageId);
        if (language) {
            return res.status(201).json(language);
        }
        else {
            return res.status(200).json({ message: "Language not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getLanguageById = getLanguageById;
// Update a language
const updateLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { languageId } = req.params;
    const { name, direction } = req.body;
    try {
        const updatedLanguage = yield Language_1.default.findByIdAndUpdate(languageId, { name, direction }, { new: true });
        if (updatedLanguage) {
            return res.status(201).json(updatedLanguage);
        }
        else {
            return res.status(200).json({ message: "Language not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.updateLanguage = updateLanguage;
// Delete a language
const deleteLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { languageId } = req.params;
    try {
        const deletedLanguage = yield Language_1.default.findByIdAndDelete(languageId);
        if (deletedLanguage) {
            return res.status(201).json({ message: "Language deleted successfully" });
        }
        else {
            return res.status(200).json({ message: "Language not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.deleteLanguage = deleteLanguage;
// Add a post to a language
const addPostToLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { languageId } = req.params;
    const { postId } = req.body;
    try {
        const updatedLanguage = yield Language_1.default.findByIdAndUpdate(languageId, { $addToSet: { posts: postId } }, { new: true });
        if (updatedLanguage) {
            return res.status(201).json(updatedLanguage);
        }
        else {
            return res.status(200).json({ message: "Language not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.addPostToLanguage = addPostToLanguage;
// Remove a post from a language
const removePostFromLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { languageId, postId } = req.params;
    try {
        const updatedLanguage = yield Language_1.default.findByIdAndUpdate(languageId, { $pull: { posts: postId } }, { new: true });
        if (updatedLanguage) {
            return res.status(201).json(updatedLanguage);
        }
        else {
            return res.status(200).json({ message: "Language or post not found" });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.removePostFromLanguage = removePostFromLanguage;
