const express = require('express');
const { registerUser, authUser, updateUser, registerUserAdmin } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/create-admin', registerUserAdmin);
router.put('/update/:id', protect, updateUser);

module.exports = router;
