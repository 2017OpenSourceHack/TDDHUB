app.controller('admin.ad.ad_request_manage', function($scope, $http){

  $scope.selected = {}

  $scope.list = function () {
    $http.get('/coupons/requests/new').then(function (res) {
      console.log(res)
      $scope.items = res.data.docs
    })
  }
  $scope.list()

  $scope.approve = function (item) {
    // console.log(item)
    ///coupons/requests/new/2/approve
    $http.put('/coupons/requests/new/' + item.sid + '/approve').then(function () {
      toastr.success("쿠폰등록이 승인 되었습니다")
      $scope.list()
    })
  }

  $scope.rejectData ={}
  $scope.reject = function (item) {
    // console.log(item)
    // console.log($scope.rejectData)
    ///coupons/requests/new/6/reject
    $http.put('/coupons/requests/new/' + item.sid + '/reject', $scope.rejectData).then(function () {
      toastr.success("쿠폰등록이 반려 되었습니다")
      $scope.list()
    })
  }

})      