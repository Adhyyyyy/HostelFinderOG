import User from "../models/Users.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// User Registration
export const register = async (req, res, next) => {
    try {
        console.log("📥 Register API hit!");
        console.log("Received data:", req.body); 

        const { name, email, password, phone, isAdmin } = req.body;

        if (!name || !email || !password || !phone) {
            return next(createError(400, "All fields are required!"));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("⚠️ User already exists!");
            return next(createError(400, "User already exists!"));
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hash,
            phone,
            isAdmin,
        });

        await newUser.save();
        console.log("✅ User registered successfully!");

        res.status(201).json({ message: "User has been created successfully!" });
    } catch (err) {
        console.error("❌ Registration error:", err);
        next(err);
    }
};

// User Login
export const login = async (req, res, next) => {
    try {
        console.log("Login attempt:", req.body.email); 

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found in database!");
            return next(createError(404, "User not found!"));
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            console.log("Incorrect password!");
            return next(createError(400, "Wrong password or email!"));
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        const { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
        .status(200)
        .json({ message: "Login successful", token, user: { ...otherDetails }, isAdmin });

    } catch (err) {
        console.error("Login error:", err);
        next(err);
    }
};
