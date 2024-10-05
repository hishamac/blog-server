"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const posts_1 = __importDefault(require("./routes/posts"));
const users_1 = __importDefault(require("./routes/users"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const comments_1 = __importDefault(require("./routes/comments"));
const postTypes_1 = __importDefault(require("./routes/postTypes"));
const languages_1 = __importDefault(require("./routes/languages"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, database_1.default)();
// Enable CORS
app.use((0, cors_1.default)());
// Body parser middleware to parse JSON
app.use(express_1.default.json());
app.use("/api/posts", posts_1.default);
app.use("/api/users", users_1.default);
app.use("/api/notifications", notifications_1.default);
app.use("/api/comments", comments_1.default);
app.use("/api/post-types", postTypes_1.default);
app.use("/api/languages", languages_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
