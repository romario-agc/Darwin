   app.controller('maincontroller', function($http) {

   var vm = this;
    vm.mydata = [];

    $http.get('/posts/update')
        .then(function(result) {
          console.log(result);
          vm.mydata = result.data;
         });
    }