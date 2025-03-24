import Room from "../models/Room.js";
import Hostel from "../models/Hostel.js";
import { createError } from "../utils/error.js";

// Create a new room and associate it with a hostel
export const createRoom = async (req, res, next) => {
  const hostelID = req.params.hostelid; // Get hostel ID from URL param
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hostel.findByIdAndUpdate(hostelID, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// Update room details
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// Update room availability
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { _id: req.params.id }, // Match MongoDB `_id`
      {
        $push: {
          unavailableDates: req.body.dates,
        },
      }
    );
    res.status(200).json("Room availability updated successfully.");
  } catch (err) {
    next(err);
  }
};

// Delete a room and remove it from the hostel's room list
export const deleteRoom = async (req, res, next) => {
  const hostelID = req.params.hostelid; // Get hostel ID from URL param
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hostel.findByIdAndUpdate(hostelID, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room deleted successfully.");
  } catch (err) {
    next(err);
  }
};

// Get a specific room by ID
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// Get all rooms with optional filtering
export const getRooms = async (req, res, next) => {
  try {
    const { roomType, maxPrice } = req.query;
    let filter = {};

    if (roomType) {
      filter.roomType = { $eq: roomType };
    }

    if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    const rooms = await Room.find(filter);
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

// ✅ Get all rooms under a specific hostel
export const getRoomsByHostel = async (req, res, next) => {
  try {
    const { hostelId } = req.params;
    let { roomType } = req.query;

    let filter = { hostelID: hostelId };

    // ✅ Normalize `roomType` to lowercase for case-insensitive filtering
    if (roomType) {
      roomType = roomType.toLowerCase();
      filter.roomType = { $regex: new RegExp(`^${roomType}$`, "i") }; // Case-insensitive match
    }

    const rooms = await Room.find(filter);

    if (!rooms.length) {
      return res.status(404).json({ success: false, message: "No rooms found." });
    }

    res.status(200).json({ success: true, rooms });
  } catch (err) {
    next(err);
  }
};
