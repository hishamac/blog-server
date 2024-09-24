import { Router } from "express";
import { registerUser, authUser } from "../controllers/authController";
import { protect, admin, blogger } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", authUser);

// Example of protected route for blog writers
router.get("/writer/posts", protect, blogger, (req, res) => {
  res.json({ message: "Blog writer access granted" });
});

// Example of admin protected route
router.get("/admin/dashboard", protect, admin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;
