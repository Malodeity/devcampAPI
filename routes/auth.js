const express = require('express');

const {register, login, getMe, forgotPassword, resetPassword} = require('../controllers/auth');



const router = express.Router();

const {protect } = require('../middleware/auth'); //user must be logged in to use a protected route


router.post('/register', register);
router.post('/login', login);
router.get('/me', protect,getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
