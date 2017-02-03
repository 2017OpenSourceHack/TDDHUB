app.controller('admin.api.list', function($scope, $http){

  $scope.list = function () {
    $http.get('/restapis').then(function (res)  {
      // console.log(res)
      // $scope.items = res.data
      $scope.items = res.data
    })
  }

  $scope.list()


  $scope.data = { selectedSid : ''}
  $scope.clientTypes = ['admin_web', 'mobile_app']
  $scope.methods = ['get', 'post', 'put', 'delete']

  $scope.app = {client_type : $scope.clientTypes[0], method : $scope.methods[0]}

  $scope.add = function(app) {
    // $http.post('/restapis', app).success(function () {
    //   $scope.list()
    // })

    $http.post('/restapis', app).then(function (res) {
      $scope.list()
    }, function (err) {
      alert('error : ' + err)
    })

  }

  $scope.edit = function(app) {
    delete app._id
    console.log(app)
    $http.put('/restapi/' + app.sid, app).success(function () {
      $scope.list()
    })
  }

  $scope.remove = function (sid) {
    // $scope.items.splice(index,1)
    $http.delete('/restapi/' + sid).success(function () {
      $scope.list()
    })
  }


})


