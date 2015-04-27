module.exports = (function() {
  'use strict';

  var express = require('express');

  var layout = require('fonflatter-layout');
  var path = require('path');

  var app = express();

  layout.setUpViews(app, path.join(__dirname, 'views'));
  app.use(fallbackHandler);
  registerErrorHandlers(app);

  app.on('mount', function(parent) {
    registerErrorHandlers(parent);
  });

  /**
   * Error handler which displays an error page.
   */
  function displayErrorPage(err, req, res, next) {
    if (err.status) {
      res.status(err.status);
    } else {
      res.status(500);
    }

    app.render('error.html', {
      error: err,
    }, function(err, html) {
      if (err) {
        res.send('Could not render error page!');
        next(err);
        return;
      }

      res.send(html);
    });

    next(err);
  }

  /**
   * Handles every request which was not handled already by displaying
   * an error.
   */
  function fallbackHandler(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }

  /**
   * Error handler which dumps the stack trace to log.
   */
  function logError(err, req, res, next) {
    console.error(err.stack);
  }

  /**
   * Prevents registering further request handlers because
   * {@link fallbackHandler} and {@link displayErrorPage} must be the last.
   */
  function noMoreHandlers() {
    var config = require('./package.json');
    throw new Error(config.name + ' must be app.use()d last!');
  }

  /**
   * Adds all error handlers defined by this module to the given express app.
   */
  function registerErrorHandlers(app) {
    app.use(displayErrorPage);
    app.use(logError);
    app.use = noMoreHandlers;
  }

  return app;
})();
