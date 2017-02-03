app.controller('project.list', function($scope, $http,$state, toastr){

  $scope.selected = {}
  $scope.data = { selectedSid : ''}

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

  $scope.share = function (item) {
    $http.post('/projects'+item.sid+'/users/').then(function () {
      $scope.list();
    })
  }
  $scope.view = function (item) {
    $http.get('/users/'+$scope.user.sid+'/projects/'+item.sid).then(function () {
      $state.go('login');
    })
  }

    $scope.delete = function () {
      $http.post('/users/'+item.sid+'/projects').then(function () {
        $scope.list()
      })
    }


})
