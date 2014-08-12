'use strict';

// require external bower-managed angular libraries
require('angular');
require('angular-ui-router');

// require controllers ng-module definition
require('./controllers');

// require environment settings
var env = require('./env');

// require a vanilla npm-managed module
var _ = require('lodash');

// a trivial example to use an npm module
_.forEach(_.keys(env), function (key) {
  console.log('env[', key, '] = ', env[key]);
});

// define and export app
var app = module.exports = angular.module('MyApp', [
  'ui.router',
  'MyApp.controllers'
]);

// define app routes
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: env.templatePath('home.html'),
      controller: 'HomeController'
    });

  $urlRouterProvider.otherwise('/home');
});

