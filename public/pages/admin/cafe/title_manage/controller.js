app.controller('admin.cafe.title_manage', function($scope, $http, toastr){

  $scope.selected = {}

  $scope.list = function () {
    $http.get('/titles').then(function (res) {
      console.log(res)
      $scope.items = res.data.docs
    })
  }
  $scope.list()

  //  TODO : 추가 수정 삭제 기능구현 화면UI 확인
  //
  // $scope.approve = function (item) {
  //   $http.put('/cafeinfos/requests/modify/' + item.sid + '/approve').then(function () {
  //     toastr.success("쿠폰등록이 승인 되었습니다")
  //     $scope.list()
  //   })
  // }
  //
  // $scope.rejectData ={}
  // $scope.reject = function (item) {
  //   $http.put('/cafeinfos/requests/modify/' + item.sid + '/reject', $scope.rejectData).then(function () {
  //     toastr.success("쿠폰등록이 반려 되었습니다")
  //     $scope.list()
  //   })
  // }


})


