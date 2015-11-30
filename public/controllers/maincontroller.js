//Dependencies
var app = angular.module('funnel', ['angular-loading-bar', 'ngAnimate']);

app.controller('maincontroller', function($scope, $http) {

  //Function that loads  data from url
  $scope.loadMainData = function() {
    $scope.url = null;

    $http.get("https://www.reddit.com/r/all+leagueoflegends+teslamotors+spacex.json")
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

  $scope.loadsubjectnames = function() {
    $http.get("/getsubjects")
      .success(function(data) {
        $scope.subjectsnames = data;
      });
  };

  $scope.range = function(count){
    var ratings = [];
    for (var i = 0; i < count; i++) {
      ratings.push(i);
    }
    return ratings;
  };

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

app.controller('SubjectTitle', ['$scope', function($scope) {
      $scope.Subject = {
        title: 'Global',
        sources: 4,
      };

      $scope.updateModel = function(name) {
        $scope.Subject= {
          title: name,
          sources: 4,
        };
      };
    }]);
