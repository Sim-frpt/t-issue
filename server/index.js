require('dotenv').config();


const express = require('express');
const db = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const debug = require('debug')('t-issue:server');
const bcrypt = require('bcrypt');

//Model
const User = require('./db/models/user');

// Router
const userRouter = require('./routes/api/user');
const projectRouter = require('./routes/api/project');
const commentRouter = require('./routes/api/comment');
const issueRouter = require('./routes/api/issue');
const sessionRouter = require('./routes/api/session');

const app = express();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}

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
  debug(id);
  try {
    const user = await User.findById(id);

    if (!user) {
      done(null, false, { message: 'User not found.' });
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send("Hello from tissue");
});

// Route handlers
app.use('/api', userRouter, projectRouter, commentRouter, issueRouter, sessionRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;

  next(error);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV = 'development') {
    debug(err.stack);
  }

  res.status(err.status || 500);

  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(process.env.PORT, () => {
    debug(`app listening on port ${process.env.PORT}`);
});
