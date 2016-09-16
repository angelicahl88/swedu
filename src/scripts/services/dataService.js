'use strict';

var angular = require('angular');
var services = angular.module('swedu-app.services', []);

var dataCollection = require('../../data/swedu.json');

services.factory('dataFactory', function() {
  return {
    loadToplist: function(callback) {
      return callback(dataCollection);
    },
    loadSchoolData: function(schoolName, callback) {
      var schoolData = [];

      dataCollection.forEach(function(value, index) {
        
        if(value.Skola === schoolName) {
          schoolData.push(value);
        }
      });

      callback(schoolData);
    }
  }

});
