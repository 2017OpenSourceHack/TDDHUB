app.controller('detail', function($scope, $http,$state,$stateParams, toastr){

//   $scope.selected = {}
//   $scope.data = { selectedSid : ''}
  $scope.project={};
  $scope.category={};
  $scope.testcase={};
  $scope.height=37;
//
//
  $scope.view = function () {
    $http.get('/users/'+$scope.user.sid+'/projects/'+$stateParams.id).then(function (res) {
      console.log(res);
      $scope.project=res.data;
    });
  };
  $scope.view();


  $scope.selectCategory = function(item){
    $scope.category=item;
  };

  $scope.selectTestcase = function(item){
    $scope.testcase=item;
  };

  $scope.test = function (item) {
      console.log(item);
      if (item.method === 'post' ||item.method === 'POST') {
          $http.post( $scope.project.serverurl+item.url, item.data).then(function (result) {
              toastr.success('Success');
              item.response=result;
          }, function (error) {
              toastr.error('Error');
              item.response=error;
          })
      } else if (item.method === 'put' ||item.method === 'PUT') {
          $http.put($scope.project.serverurl+item.url, item.data).then(function (result) {
              toastr.success('Success');
              item.response=result;
          }, function (error) {
              toastr.error('Error');
              item.response=error;
          })
      } else if (item.method === 'delete' || item.method === 'DELETE') {
          $http.delete($scope.project.serverurl+item.url).then(function (result) {
              toastr.success('Success');
              item.response=result;
          }, function (error) {
              toastr.error('Error');
              item.response=error;
          })
      } else if (item.method === 'get' ||item.method === 'GET') {
          $http.get($scope.project.serverurl+item.url).then(function (result) {
              toastr.success('Success');
                item.response=result;
          }, function (error) {
              toastr.error('Error');
              item.response=error;
          })
      }

      $http.post('/projects/'+$scope.project.sid+'/categories/'+$scope.category.sid+'/testcases', item);

  }

//   $scope.new_category = function (item) {
//     $http.post('/users/'+$scope.user.sid+'/projects').then(function () {
//       toastr.success("생성완료.");
// $scope.view()
//     })
//   }
//
//   $scope.delete_category = function () {
//     $http.post('/projects/'+$scope.data.selectedSid+'/users?email='+$scope.useremail).then(function () {
// $scope.view()
//     })
//   }
//
//   $scope.new_testcase = function (item) {
//     $http.get('/users/'+$scope.user.sid+'/projects/'+item.sid).then(function () {
// $scope.view()
//     })
//   }
//
//     $scope.delete_testcase = function () {
//       $http.post('/users/'+item.sid+'/projects').then(function () {
//         $scope.view()
//       })
//     }


});
