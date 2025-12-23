const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User Registered" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "All Users Fetched",
            users: users
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Single User
exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ message: "User fetched by ID", users: user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ message: "User Updated", users: user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User Deleted", users: user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
