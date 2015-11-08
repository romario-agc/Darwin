//Dependencies
var app = angular.module('funnel', []);

app.controller('maincontroller', function($scope, $http) {

  //Function that loads  data from url
  $scope.loadData = function () {
    $http.get("https://obscure-waters-1317.herokuapp.com/posts/update")
    .success(function (data) {$scope.names = data;});
  };

  //Initial load
  $scope.loadData();

});
