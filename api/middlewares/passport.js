const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const Account = require('../models/Account');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

module.exports = (passport) => {
  passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {
    let account = null;
    try {
      account = await Account.findById(jwtPayload.id);
    } catch (error) {
      console.log(error);
    }

    if (!account) {
      return done(null, false);
    }
    return done(null, account);
  }));
};
