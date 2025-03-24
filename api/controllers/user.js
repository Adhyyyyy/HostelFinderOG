import User from "../models/Users.js";

// ✅ Create a new user
export const createUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error });
    }
};

// ✅ Update an existing user
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user", error });
    }
};

// ✅ Delete a user
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error });
    }
};

// ✅ Get a single user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to get user", error });
    }
};

// ✅ Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to get users", error });
    }
};
