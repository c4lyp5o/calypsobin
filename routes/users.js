const express = require('express');
const router = express.Router();
const usercon = require('../controllers/users');
const auth = require('../middleware/auth');

router.get('/register', usercon.registerUserForm);
router.post('/register', usercon.registerUser);
router.get('/login', usercon.loginUserForm);
router.post('/login', usercon.loginUser);
router.get('/welcome', auth, usercon.welcome);
router.get('/logout', auth, usercon.logMeOut);

module.exports = router;
