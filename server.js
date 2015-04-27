#!/usr/bin/env node

(function() {
  'use strict';

  var app = require('./dummy');

  var port = parseInt(process.env.PORT);

  if (port) {
    console.log('Running at port ' + port + ' ...');
    app.listen(port);
  } else {
    var config = require('./package.json');
    var hostname = config.name + '.node.js';
    port = 62000;
    console.log('Running at http://' + hostname + ':' + port + ' ...');
    app.listen(port, hostname);
  }

})();
