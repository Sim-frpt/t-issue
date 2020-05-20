require('dotenv').config();

require('./db/db');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const debug = require('debug')('t-issue:server');


const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send("Hello from tissue");
});

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
