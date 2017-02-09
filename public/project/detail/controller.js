app.controller('detail', function($scope, $http,$state,$stateParams, toastr){

//   $scope.selected = {}
//   $scope.data = { selectedSid : ''}
  $scope.project={};
  $scope.category={};
  $scope.newcategory={};
  $scope.newtestcase={};
  $scope.testcase={};
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
    $scope.testcase={};
  };

  $scope.selectTestcase = function(item,subitem){
    $scope.category=item;
    $scope.testcase=subitem;
    $scope.newtestcase=subitem;
    console.log(  $scope.category);
    console.log(  $scope.testcase);
  };

  $scope.test = function (item) {
      if(!item.method || !item.url ||!$scope.category){
        toastr.error('Wrong Input.');
        return;
      }
      console.log(item);

      if (item.method === 'post' ||item.method === 'POST') {
          $http.post( $scope.project.serverurl+item.url, item.request).then(function (result) {
              toastr.success('Success');
              item.response=JSON.stringify(result.data);
              $http.post('/projects/'+$stateParams.id+'/categories/'+$scope.category.sid+'/testcases', item);
          }, function (error) {
              toastr.error('Error');
              item.response=JSON.stringify(error);
          });
      } else if (item.method === 'put' ||item.method === 'PUT') {
          $http.put($scope.project.serverurl+item.url, item.request).then(function (result) {
              toastr.success('Success');
              item.response=JSON.stringify(result.data);
              $http.post('/projects/'+$stateParams.id+'/categories/'+$scope.category.sid+'/testcases', item);
          }, function (error) {
              toastr.error('Error');
              item.response=JSON.stringify(error);
          });
      } else if (item.method === 'delete' || item.method === 'DELETE') {
          $http.delete($scope.project.serverurl+item.url).then(function (result) {
              toastr.success('Success');
              item.response=JSON.stringify(result.data);
              $http.post('/projects/'+$stateParams.id+'/categories/'+$scope.category.sid+'/testcases', item);
          }, function (error) {
              toastr.error('Error');
              item.response=JSON.stringify(error);
          });
      } else if (item.method === 'get' ||item.method === 'GET') {
          $http.get($scope.project.serverurl+item.url).then(function (result) {
              toastr.success('Success');
                item.response=JSON.stringify(result.data);
                $http.post('/projects/'+$stateParams.id+'/categories/'+$scope.category.sid+'/testcases', item);
          }, function (error) {
              toastr.error('Error');
              item.response=JSON.stringify(error);
          });
      }



  }

  $scope.new_category = function (item) {
    console.log(item);
    $http.post('/projects/'+$stateParams.id+'/categories',item).then(function (result) {
      toastr.success("Completed.");
      $scope.view();
    }, function(error){
      toastr.error('Error');
    });
  };
//
//   $scope.delete_category = function () {
//     $http.post('/projects/'+$scope.data.selectedSid+'/users?email='+$scope.useremail).then(function () {
// $scope.view()
//     })
//   }
//
  $scope.new_testcase = function (item) {
    if(!item.name){
      toastr.error('Enter the API Description.');
      return;
    }
    item.method="GET";
    item.url="/";
    $http.post('/projects/'+$stateParams.id+'/categories/'+$scope.category.sid+'/testcases',item).then(function () {
      toastr.success('Completed.');
      $state.reload();
    }, function(error){
      toastr.error('Error');
    });
  };
//
//     $scope.delete_testcase = function () {
//       $http.post('/users/'+item.sid+'/projects').then(function () {
//         $scope.view()
//       })
//     }

$scope.done=function(){
  $http.put('/projects/'+$stateParams.id+'/categories/'+$scope.category.sid+'/testcases/'+$scope.testcase.sid+'/users/'+$scope.user.sid).then(function(){
    toastr.success('Test Done Applied.');
    $scope.view();
  }, function(error){
    toastr.error('Error');
  });

};

});
