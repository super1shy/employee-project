const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.post('/login', usersController.login);

router.post('/register', usersController.register);

router.get('/current', usersController.current);

module.exports = router;
