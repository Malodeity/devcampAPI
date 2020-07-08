const express = require('express');

const {register, login, getMe} = require('../controllers/auth');



const router = express.Router();

const {protect } = require('../middleware/auth'); //user must be logged in to use a protected route


router.post('/register', register);
router.post('/login', login);
router.get('/me', protect,getMe);

module.exports = router;
