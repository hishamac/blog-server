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
exports.deleteNotification = exports.markAllAsRead = exports.markAsRead = exports.getUserNotifications = exports.createNotification = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
// Create a new notification
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipients, type, message, postId } = req.body;
    try {
        const notification = new Notification_1.default({
            recipients,
            type,
            message,
            post: postId,
            read: false
        });
        yield notification.save();
        return res.status(201).json(notification);
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.createNotification = createNotification;
// Get notifications for a user
const getUserNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const notifications = yield Notification_1.default.find({ recipients: userId }).sort({ createdAt: -1 });
        return res.status(201).json(notifications);
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.getUserNotifications = getUserNotifications;
// Mark a single notification as read for a specific user
const markAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationId } = req.params;
    const { userId } = req.body;
    try {
        const updatedNotification = yield Notification_1.default.findOneAndUpdate({ _id: notificationId, recipients: userId }, { read: true }, { new: true });
        if (updatedNotification) {
            return res.status(201).json(updatedNotification);
        }
        else {
            return res.status(200).json({ message: "Notification not found or user not a recipient" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.markAsRead = markAsRead;
// Mark all notifications as read for a specific user
const markAllAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const result = yield Notification_1.default.updateMany({ recipients: userId, read: false }, { read: true });
        return res.status(201).json(result);
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.markAllAsRead = markAllAsRead;
// Delete a notification
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationId } = req.params;
    try {
        const deletedNotification = yield Notification_1.default.findByIdAndDelete(notificationId);
        if (deletedNotification) {
            return res.status(201).json({ message: "Notification deleted successfully" });
        }
        else {
            return res.status(200).json({ message: "Notification not found" });
        }
    }
    catch (err) {
        return res.status(200).json({
            message: "Server error",
            error: err instanceof Error ? err.message : err
        });
    }
});
exports.deleteNotification = deleteNotification;
