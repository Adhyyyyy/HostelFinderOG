import express from "express";
import { 
  createRoom, 
  updateRoom, 
  updateRoomAvailability, 
  deleteRoom, 
  getRoom, 
  getRooms, 
  getRoomsByHostel
} from "../controllers/room.js";

const router = express.Router();

// ✅ Get all rooms under a specific hostel
router.get("/hostel/:hostelId", getRoomsByHostel);

// Create Room
router.post("/:hostelid", createRoom);

// Update Room
router.put("/:id", updateRoom);

// Update Room Availability
router.put("/availability/:id", updateRoomAvailability);

// Delete Room (Updated to use :id/:hostelid)
router.delete("/:id/:hostelid", deleteRoom);

// Get Single Room
router.get("/:id", getRoom);

// Get All Rooms (With Filtering)
router.get("/", getRooms);

export default router;
