app.controller('project.list', function($scope, $http,$state, toastr){

  $scope.selected = {}
  $scope.data = { selectedSid : ''}
  $scope.useremail="";
  $scope.list = function () {
    $http.get('/users/'+$scope.user.sid+'/projects').then(function (res) {
      console.log(res);
      $scope.items = res.data.docs;
      $scope.name= $scope.user.name;
    })
  }
  $scope.list();

  $scope.new = function (item) {
    $http.post('/users/'+$scope.user.sid+'/projects').then(function () {
      toastr.success("생성완료.");
      $scope.list()
    })
  }

  $scope.share = function () {
    $http.post('/projects/'+$scope.data.selectedSid+'/users?email='+$scope.useremail).then(function () {
      $scope.list();
    })
  }

  $scope.view = function (item) {
    $http.get('/users/'+$scope.user.sid+'/projects/'+item.sid).then(function () {
      $state.go('project.list.detail');
    })
  }

    $scope.delete = function () {
      $http.post('/users/'+item.sid+'/projects').then(function () {
        $scope.list()
      })
    }
})
