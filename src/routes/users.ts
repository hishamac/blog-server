import { Router } from "express";
import {
  registerUser,
  authUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/users";
import { protect, admin, blogger } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/register", registerUser);
router.post("/login", authUser);
router.put("/:id", protect, blogger, updateUser);
router.delete("/:id", protect, blogger, deleteUser);

export default router;
