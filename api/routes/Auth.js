const express = require('express');
const passport = require('passport');

const AuthController = require('../controllers/Auth');

const route = express.Router();

route.post('/register', AuthController.register);
route.post('/login', AuthController.login);
route.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile', 'user_location'],
}));
route.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/auth/failed',
  session: false,
}), AuthController.loginFacebook);
route.get('/auth/failed', AuthController.loginSocialFailed);
module.exports = route;
