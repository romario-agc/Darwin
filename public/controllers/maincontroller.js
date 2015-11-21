//Dependencies
var app = angular.module('funnel', ['angular-loading-bar', 'ngAnimate']);

app.controller('maincontroller', function($scope, $http) {

  //Function that loads  data from url
  $scope.loadMainData = function() {
    $http.get("https://www.reddit.com/r/leagueoflegends+teslamotors+spacex.json")
      .success(function(data) {
        $scope.names = data;
      });
  };

  //Function that loads  data from  Tesla url
  $scope.loadteslaData = function() {
    $http.get("https://www.reddit.com/r/teslamotors.json")
      .success(function(data) {
        $scope.names = data;
      });
  };

  //Function that loads  data from League of Legends url
  $scope.loadleagueData = function() {
    $http.get("https://www.reddit.com/r/leagueoflegends.json")
      .success(function(data) {
        $scope.names = data;
      });
  };

  $scope.loadSpaceXData = function() {
    $http.get("https://www.reddit.com/r/spacex.json")
      .success(function(data) {
        $scope.names = data;
      });
  };

  //Initial load
  $scope.loadMainData();



});

app.directive('loading', ['$http', function($http) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      scope.isLoading = function() {
        return $http.pendingRequests.length > 0;
      };

      scope.$watch(scope.isLoading, function(v) {
        if (v) {
          elm.show();
        } else {
          elm.hide();
        }
      });
    }
  };

}]);