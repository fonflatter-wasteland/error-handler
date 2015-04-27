#!/usr/bin/env node

var server = require('simple-express-server');
var app = require('./dummy');
server(app);
