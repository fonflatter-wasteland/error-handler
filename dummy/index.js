module.exports = (function() {
  'use strict';

  var express = require('express');

  var logger = require('morgan');
  var path = require('path');

  var layout = require('fonflatter-layout');
  var errorHandler = require('..');

  var app = express();

  app.use(logger('dev'));
  app.use(layout);
  app.get('/error', dummyErrorPage);
  app.get('/teapot-error', teapotErrorPage);
  app.use(errorHandler);

  /**
   * Request handler throwing an error for testing.
   */
  function dummyErrorPage(req, res, next) {
    var err = new Error('Custom error');
    next(err);
  }

  /**
   * Request handler throwing an error with HTTP status for testing.
   */
  function teapotErrorPage(req, res, next) {
    var err = new Error('I’m a teapot');
    err.status = 418;
    next(err);
  }

  return app;
})();
