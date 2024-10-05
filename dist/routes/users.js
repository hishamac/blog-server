"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../services/users");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.get("/", users_1.getAllUsers);
router.get("/:id", users_1.getUserById);
router.post("/register", users_1.registerUser);
router.post("/login", users_1.authUser);
router.put("/:id", authMiddleware_1.protect, authMiddleware_1.blogger, users_1.updateUser);
router.delete("/:id", authMiddleware_1.protect, authMiddleware_1.blogger, users_1.deleteUser);
exports.default = router;
