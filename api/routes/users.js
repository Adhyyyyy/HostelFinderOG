import express from "express";
import { createUser, updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// ✅ Add a route to create a user
router.post("/", createUser);

// ✅ Update user
router.put("/:id", verifyUser, updateUser);

// ✅ Delete user
router.delete("/:id", verifyUser, deleteUser);

// ✅ Get single user
router.get("/:id", verifyUser, getUser);

// ✅ Get all users (only admin can access)
router.get("/", verifyAdmin, getUsers);

export default router;
