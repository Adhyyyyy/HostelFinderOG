import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
    bedID: { type: String, required: true, unique: true },
    roomID: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    bedStatus: { type: String, enum: ["Available", "Occupied", "Reserved"], required: true }
}, { timestamps: true });

export default mongoose.model("Bed", bedSchema);
