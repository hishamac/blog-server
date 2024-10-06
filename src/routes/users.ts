import { Router } from "express";
import {
  registerUser,
  authUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
} from "../services/users";
import { protect, admin, blogger } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/follow/:id", protect, blogger, followUser);
router.post("/unfollow/:id", protect, blogger, unfollowUser);
router.put("/:id", protect, blogger, updateUser);
router.delete("/:id", protect, blogger, deleteUser);

export default router;
