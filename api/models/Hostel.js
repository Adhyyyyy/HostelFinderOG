import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, enum: ["Hostel", "PG"], required: true },
    genderType: { type: String, enum: ["Boys", "Girls"], required: true },
    distanceFromCollege: { type: Number, required: true },
    address: { type: String, required: true },
    vacancy: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    amenities: [{ type: String, trim: true }],
    messType: { type: Boolean, required: true, default: false },
    pricing: { type: Number, required: true, min: 1000 },
    contact: { type: String, required: true, match: [/^\d{10}$/, "Invalid phone number"] },
    ownerName: { type: String, required: true },
    ownerContact: { type: String, required: true, match: [/^\d{10}$/, "Invalid phone number"] },
    image: { type: String, default: "https://example.com/default-hostel.jpg" },
    rules: [{ type: String, trim: true }],
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    location: {
      lat: { type: Number, required: true }, // Latitude
      lng: { type: Number, required: true }, // Longitude
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hostel", hostelSchema);
