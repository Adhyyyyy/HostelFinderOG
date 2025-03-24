import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomID: { type: String, required: true, unique: true },
    hostelID: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", required: true },
    roomNumber: { type: String, required: true, unique: true }, 
    roomType: { type: String, enum: ["Single", "Double", "Triple", "Quad", "Five", "Six"], required: true },
    totalBeds: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
