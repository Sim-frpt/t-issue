const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const debug = require('debug')('t-issue:passport');
const bcrypt = require('bcrypt');

// Model
const User = require.main.require('./db/models/user');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (username, password, done) => {
    try {
      const user = await User.findByMail(username);

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isPwdOk = await bcrypt.compare(password, user.password);

      if (!isPwdOk) {
        return done(null, false, { message: 'Incorrect pasword.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);

    if (!user) {
      done(null, false, { message: 'User not found.' });
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
