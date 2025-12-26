const express = require('express');
const router = express.Router();

const protect = require('../middleware/authmiddleware');

const {
    registerUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/users', protect, getAllUsers);
router.get('/users/:id', protect, getSingleUser);
router.put('/users/:id', protect, updateUser);
router.delete('/users/:id', protect, deleteUser);

module.exports = router;
