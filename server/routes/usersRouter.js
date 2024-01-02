const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const { auth } = require('../middleware/auth');

router.post('/login', usersController.login);

router.post('/register', usersController.register);

router.get('/current', auth, usersController.current);

module.exports = router;
