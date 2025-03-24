import express from "express";
import Hostel from "../models/Hostel.js";
import {  
  countByGender, 
  countByCategory, 
  createHostel, 
  deleteHostel, 
  getHostel, 
  getHostels, 
  updateHostel 
} from "../controllers/hostel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CRUD Routes
router.post("/", verifyAdmin, createHostel);
router.put("/:id", verifyAdmin, updateHostel);
router.delete("/:id", verifyAdmin, deleteHostel);
router.get("/find/:id", getHostel);
router.get("/", getHostels);

// Counting Routes
router.get("/countByGender", countByGender);
router.get("/countByCategory", countByCategory); // ✅ Added category count route

export default router;
