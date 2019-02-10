const express = require('express');

const AuthController = require('../controllers/Auth');

const route = express.Router();

route.post('/register', AuthController.register);
route.post('/login', AuthController.login);
module.exports = route;
