   app.controller('maincontroller', function($scope, $http) {

    $http.get('/posts/update').success(function(data) {
        if (err) throw err;
        console.log(data);
        $scope.myupdate = data;
        });
    });
