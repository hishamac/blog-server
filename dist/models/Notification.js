"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var NotificationType;
(function (NotificationType) {
    NotificationType["LIKE"] = "like";
    NotificationType["COMMENT"] = "comment";
    NotificationType["FOLLOW"] = "follow";
    NotificationType["POST"] = "post";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
// Define Notification Schema
const NotificationSchema = new mongoose_1.Schema({
    recipients: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }],
    type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true,
    },
    message: { type: String, required: true },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post" },
    read: { type: Boolean, default: false }, // Marks whether the notification has been read
}, { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
// Export the Notification model
exports.default = mongoose_1.default.model("Notification", NotificationSchema);
