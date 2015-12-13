//Dependencies
var app = angular.module('funnel', ['angular-loading-bar', 'ngAnimate']);

app.controller('maincontroller', function($scope, $http) {

  //Function that loads  data from url
  $scope.loadMainData = function() {
    $scope.url = null;

    $http.get("https://www.reddit.com/r/all+leagueoflegends+teslamotors+spacex+poltiics.json")
      .success(function(data) {
        $scope.names = data;
      });

  };

  //Function that loads  data from inserted url
  $scope.loadData = function(url) {
    $http.get(url)
      .success(function(data) {
        $scope.names = data;
      });
  };

  /* Sends new name to databse
  $scope.postnewname = function() {
    $http.post("/newpost")
      .success(function(data) {
        $scope.message = success;
      });
  };
*/
  //Initial load
  $scope.loadMainData();

  $scope.loadsubjectnames = function() {
    $http.get("/getsubjects")
      .success(function(data) {
        $scope.subjectsnames = data;
      });
  };

  $scope.loadsubjectnames();


  $scope.setProject = function (id) {
     $scope.currentvideo = $scope.videos[id];
     $scope.currentvideourl = $sce.trustAsResourceUrl($scope.names.data.children[count].data.secure_media.oembed.url);
   };

   $scope.selected = 0;

    $scope.select= function(index) {
       $scope.selected = index;
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
        title: 'Global',
        sources: 4,
      };


      $scope.updateModel = function(name) {
        $scope.Subject= {
          title: name,
          sources: 4,
        };
      };

      $scope.master={ };

      $scope.updateeditmodel = function(name) {
        $scope.master= angular.copy(name);

      };

      $scope.reset = function() {
        $scope.subject= angular.copy($scope.master);
      };

      $scope.reset();

    }]);
