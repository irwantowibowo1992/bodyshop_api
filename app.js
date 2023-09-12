const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

var app = express();

const logFormat = {
  remote: ':remote-addr',
  user: ':remote-user',
  method: ':method',
  path: ':url',
  code: ':status',
  size: ':res[content-length]',
  agent: ':user-agent',
  responseTime: ':response-time',
};

if (process.env.NODE_ENV !== 'development') {
  app.use(logger(JSON.stringify(logFormat)));
} else {
  app.use(logger('dev'));
}

app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const ErrorHandler = require('./app/utils/exception.util');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

const routesDir = path.join(__dirname, 'routes');

fs.readdirSync(routesDir).forEach((file) => {
  const fullPath = path.join(routesDir, file);
  if (fs.statSync(fullPath).isFile()) {
    const route = require(fullPath);
    app.use('/api', route);
  }
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
const errorHandler = new ErrorHandler();
app.use(function (err, req, res, next) {
  if (typeof err.handle === 'function') {
    err.handle();
  }

  if (err.printMsg === undefined) {
    err.stack += ` [Path: ${req.path}]`;
    console.error(err);
  }

  res.status(err.statusCode || 500).json({
    code: err.statusCode || 500,
    msg: err.printMsg || 'Something went wrong!',
    errorCode: err.errorCode,
  });
});

module.exports = app;
