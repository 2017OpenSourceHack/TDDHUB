app.controller('project.list', function($scope, $http,$state, toastr){

  $scope.selected=0;
  // $scope.selectedproject="";
  $scope.useremail="";
  $scope.project={};
  $scope.list = function () {
    $http.get('/users/'+$scope.user.sid+'/projects').then(function (res) {
      console.log($scope.user);
      $scope.items = res.data.docs;
      $scope.name= $scope.user.name;
    });
  };
  $scope.list();

  $scope.create = function (project) {
    if(!project.name || !project.description || !project.serverurl){
      toastr.error("You Must Fill Project Info.");
    }else{
        $http.post('/users/'+$scope.user.sid+'/projects',project).then(function (res) {
          console.log(res);
          toastr.success("Create Completed!");
            $scope.list();
        },function (err) {
                toastr.error("Failed");
        });
    }
  };

  $scope.share = function () {
    $http.post('/projects/'+$scope.selected+'/users?email='+$scope.useremail).then(function () {
      $scope.list();
    });
  };


    $scope.delete = function () {
      $http.delete('/users/'+$scope.user.sid+'/projects/'+$scope.selected).then(function (res) {
        // console.log(res);
        toastr.success("Delete Done.");
        // $state.reload();
          $scope.list();
      },function (err) {
              toastr.error("Delete failure");
          });

};
});
