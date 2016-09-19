'use strict';

var angular = require('angular');
var directives = angular.module('swedu-app.directives', []);
var d3 = require('d3');

directives.directive('sweduWrapper', function() {
  return {
    templateUrl: './templates/sweduWrap.html'
  };
});

directives.directive('topList', function() {
  return {
    templateUrl:'./templates/topList.html'
  };
});

directives.directive('uniView', function() {
  return {
    templateUrl:'./templates/uniView.html'
  };
});

directives.directive('schoolTable', function() {
  return {
    templateUrl:'./templates/schoolTable.html'
  };
});

directives.directive('schoolGraph', function() {
  return {
    templateUrl:'./templates/schoolGraph.html'
  };
});

directives.directive('scatterPlot', function($window, $document) {
  return {
    templateUrl: './templates/scatterPlot.html',
    link: function($scope) {
      var data = $scope.school;

      $scope.xAxisTitle = 'Sökande totalt';
      $scope.yAxisTitle = 'Förstahandsval';

      var setRadius = function(xValue, yValue) {
        return ((xValue + yValue) / 1000) + 3;
      };

      var showDotInfo = function(data, dot) {
        var hoverDot = angular.element($document[0].getElementById('hoverDot'));
        hoverDot.addClass('highlight');
        hoverDot.text(data.Utbildning);

        dot
          .style('fill', '#4a7b6f');
      };

      var hideDotInfo = function(dot) {
        var hoverDot = angular.element($document[0].getElementById('hoverDot'));
        hoverDot.removeClass('highlight');
        hoverDot.text('');

        dot.style('fill', 'rgba(238, 238, 231, 0.4)');
      };

      var graph = {
        id: 'schoolSVG',
        height: 550,
        width: 550,
        margin: 50
      };

      var x = d3.scaleLinear().range([graph.margin, graph.width - graph.margin]);
      var y = d3.scaleLinear().range([graph.height - graph.margin, graph.margin]);

      var valueLine = d3.line()
        .x(function(d) {
          return x(d.Total);
        })
        .y(function(d) {
          return y(d.Fh);
        });

      var svg = d3.select('#schoolGraph').append('svg')
        .attr('id', graph.id)
        .attr('height', graph.height)
        .attr('width', graph.width)

      x.domain([0, d3.max(data.programs, function(d) { return d.Total; })]);

      y.domain([0, d3.max(data.programs, function(d) { return d.Fh; })]);



        // gridlines in x axis function
      function make_x_gridlines() {
          return d3.axisTop(x);
      }

      // gridlines in y axis function
      function make_y_gridlines() {
          return d3.axisLeft(y);
      }


      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(0,' + (graph.width - graph.margin) + ')')
        .call(make_x_gridlines()
          .tickSize((graph.width - graph.margin))
          .tickFormat('')
        );

      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(' + graph.margin + ',0)')
        .call(make_y_gridlines()
          .tickSize((-graph.width + graph.margin))
          .tickFormat('')
        );

      svg.append('g')
        .attr('class', 'values')
        .attr('transform', 'translate(0,' + (graph.width - graph.margin) + ')')
        .call(d3.axisBottom(x));

      svg.append('g')
      .attr('class', 'values')
      .attr('transform', 'translate(' + graph.margin + ',0)')
        .call(d3.axisLeft(y));

      var chartG = svg.append('g');

      chartG.selectAll('dot')
        .data(data.programs)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('r', function(d) {
          return setRadius(d.Total, d.Fh);
        })
        .attr('cx', function(d) {
          return x(d.Total);
        })
        .attr('cy', function(d) {
          return y(d.Fh);
        })
        .on('mouseenter', function(d) {
          var dot = d3.select(this);
          showDotInfo(d, dot);
        })
        .on('mouseleave', function() {
          var dot = d3.select(this);
          hideDotInfo(dot);
        });
    }
  };
});
