//Dependencies
var app = angular.module('funnel', ['angular-loading-bar', 'ngAnimate']);

app.controller('maincontroller', function($scope, $http) {

  //Function that loads  data from url
  $scope.loadMainData = function() {
    $scope.url = null;

    $http.get("https://www.reddit.com/.json")
      .success(function(data) {
        $scope.names = data;
      });
  };

  $scope.loadsubjectnames = function() {
    $http.get("/getsubjects").success(function(data) {
        $scope.subjectsnames = data;
      });
  };

  //Initial loads
  $scope.loadMainData();
  $scope.loadsubjectnames();


  //Function that loads  data from inserted url
  $scope.loadData = function(url) {
    $http.get(url)
      .success(function(data) {
        $scope.names = data;
      });
  };

  // Sends new name to databse
  $scope.changesubname = function(oldname , newname) {

    var change = {
      oldname: oldname,
      newname: newname
    };

    $http.post("/changename")
      .success(function(data) {
        $scope.message = success;
      });
  };

  // Returns subject information
  $scope.getsubdetails = function(name) {

    $http.post("/getdetails")
      .success(function(data) {
        $scope.message = success;
        $scope.subjectdata = data;
      });
  };

  $scope.setProject = function (id) {
     $scope.currentvideo = $scope.videos[id];
     $scope.currentvideourl = $sce.trustAsResourceUrl($scope.names.data.children[count].data.secure_media.oembed.url);
   };

  // Active favourite class manager
  $scope.select= function(item) {
        $scope.selected = item;
  };

  $scope.isActive = function(item) {
        return $scope.selected === item;
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

app.controller('SubjectTitle', ['$scope', function($scope, $http) {

      $scope.Subject = {
        title: null,
        sources: null,
      };

      $scope.updateModel = function(name) {
        $scope.Subject= {
          title: name,
          sources: 4,
        };
        console.log(name);
      };

      $scope.master={
        name:'Default'
      };

      $scope.updateeditmodel = function(name) {
        $scope.master= {name: name};
        console.log(name);
      };

      $scope.reset = function() {
        $scope.subject= angular.copy($scope.master);
      };

      $scope.reset();

  }]);


app.controller('ScrollController', ['$scope', '$location', '$anchorScroll',
    function ($scope, $location, $anchorScroll) {
      $scope.scroll = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('div1');

        // call $anchorScroll()
        $anchorScroll();
      };
}]);
