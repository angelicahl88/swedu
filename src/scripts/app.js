'use strict';

var angular = require('angular');
var app = angular.module('swedu-app', ['swedu-app.directives', 'swedu-app.controllers', 'swedu-app.services']);

require('./directives/sweduWrapper.js');
require('./controllers/mainController.js');
require('./services/dataService.js');
