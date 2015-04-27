suite('error-handler', function() {
  'use strict';

  var express = require('express');

  var expect = require('chai').expect;
  var request = require('supertest');

  var app = require('../dummy');

  test('error with status', function(next) {
    request(app)
      .get('/teapot-error')
      .expect(418)
      .expect(/I’m a teapot/)
      .end(next);
  });

  test('error without status', function(next) {
    request(app)
      .get('/error')
      .expect(500)
      .expect(/Custom error/)
      .end(next);
  });

  test('non-existent page', function(next) {
    request(app)
      .get('/non-existent')
      .expect(404)
      .expect(/Not Found/)
      .end(next);
  });

  test('reqistering app after error handler', function() {
    expect(function() {
      app.use(express());
    }).to.throw(/must be app.use\(\)d last/);
  });

  test('break things', function(next) {
    var errorHandler = require('..');

    // Break things
    errorHandler.set('view', function() {
      return 'No spoon!';
    });

    request(errorHandler)
      .get('/non-existent')
      .expect(404)
      .expect(/Could not render error page/)
      .end(next);
  });
});
