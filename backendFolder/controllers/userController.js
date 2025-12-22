const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //Validate
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //checking if the user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User Already Exists' })
        }
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating the User
        const user = await User.create({
            name, email, password: hashedPassword
        })
        user.save();
        res.status(201).json({ message: "User Registered Successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        //matching the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid Credentials' });
        }
        const payload = {
            user: { id: user._id }
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
