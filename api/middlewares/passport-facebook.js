const FacebookStrategy = require('passport-facebook').Strategy;

const opts = {};

opts.clientID = process.env.FB_APP_ID;
opts.clientSecret = process.env.FB_APP_SECRET;
opts.profileFields = ['id', 'displayName', 'photos', 'email'];
opts.callbackURL = `http://localhost:${process.env.PORT || 8000}/auth/facebook/callback`;

module.exports = (passport) => {
  passport.use(new FacebookStrategy(
    opts,
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile._json);
    },
  ));
};
