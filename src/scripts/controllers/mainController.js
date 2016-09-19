'use strict';

var angular = require('angular');
var controllers = angular.module('swedu-app.controllers', []);
var d3 = require('d3');

controllers.controller('viewCtrl', function($scope, dataFactory) {

  $scope.school= {
    name: '',
    programs: []
  };

  $scope.statView = 'topList';

  $scope.changeView = function(clickedSchool) {
    if($scope.statView === 'topList') {
      $scope.statView = 'uniView';
      $scope.school.name = clickedSchool.item.Skola;
      getSchoolInfo($scope.school.name);
    } else {
      $scope.statView = 'topList';
    }
  };

  var renderSchoolInfo = function(response) {
    $scope.school.programs = response;
  }

  var getSchoolInfo = function(schoolName) {
    dataFactory.loadSchoolData(schoolName, renderSchoolInfo);
  };

});

controllers.controller('statCtrl', function($scope, dataFactory) {

  $scope.sort = {
    byType: 'Fh',
    desc: true
  };


  var renderTopList = function(response) {
    $scope.items = response;
  };

  dataFactory.loadToplist(renderTopList);
});

controllers.controller('graphCtrl', function($scope) {



});
