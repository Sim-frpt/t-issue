require('dotenv').config();

const express = require('express');
const db = require('./config/db');
const session = require('express-session');
const passport = require('./config/passport');
const path = require('path');
const debug = require('debug')('t-issue:server');
const cors = require('cors');

// Router
const userRouter = require('./routes/api/user');
const projectRouter = require('./routes/api/project');
const commentRouter = require('./routes/api/comment');
const issueRouter = require('./routes/api/issue');
const sessionRouter = require('./routes/api/session');
const priorityRouter = require('./routes/api/priority');
const tagRouter = require('./routes/api/tag');
const statusRouter = require('./routes/api/status');

const app = express();

// Express session config object
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}

app.use(express.json());
app.use('/static', express.static('public')); // Maybe I won't need this, maybe I will
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Send a No content status for favicon request cause the browser keeps asking for it and it throws a 404 status
app.use((req, res, next) => {
  if (req.originalUrl.includes('favicon.ico')) {
    return res.status(204).end();
  }
  next();
});

app.get('/', (req, res) => {
  return res.send("Hello from tissue");
});

// Route handlers
app.use('/api', userRouter, projectRouter, commentRouter, issueRouter, priorityRouter, sessionRouter, statusRouter, tagRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;

  next(error);
});

app.use((err, req, res, next) => {
  // Delegate to the default Express error handler if we're already streaming the response to the client -> see documentation on error handling
  if (res.headersSent) {
    return next(err);
  }

  if (process.env.NODE_ENV = 'development') {
    debug(err.stack);
  }

  res.status(err.status || 500);

  return res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(process.env.PORT, () => {
    debug(`app listening on port ${process.env.PORT}`);
});
