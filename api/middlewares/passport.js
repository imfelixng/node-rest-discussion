const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/Account');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

module.exports = (passport) => {
  passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {
    let user = null;
    try {
      user = await User.findById(jwtPayload.id);
    } catch (error) {
      console.log(error);
    }

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }));
};
