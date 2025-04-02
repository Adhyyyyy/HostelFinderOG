import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hostelRoute from "./routes/hostel.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import restaurantsRoute from "./routes/restaurants.js";  
import bedRoutes from "./routes/beds.js";
import bookingRoutes from "./routes/bookings.js";
import reviewRoute from "./routes/reviews.js";

dotenv.config();

const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://hostelfindercucek.netlify.app",
    "https://hostel-finder-admin.netlify.app",
    "https://hostelfinderadmindashboard.netlify.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hostel", hostelRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/restaurants", restaurantsRoute);
app.use("/api/beds", bedRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoute);



app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        succes: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

// Add this after your mongoose.connect()
mongoose.connection.on('connected', async () => {
  try {
    // Drop existing indexes
    await mongoose.connection.collections['rooms']?.dropIndexes();
    console.log('Dropped existing indexes');
  } catch (err) {
    console.log('No existing indexes to drop');
  }
});

app.listen(process.env.PORT || 8800, () => {
    connect();
    console.log("Connected to backend!");
});

