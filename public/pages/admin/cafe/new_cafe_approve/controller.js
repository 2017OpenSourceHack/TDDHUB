app.controller('admin.cafe.new_cafe_approve', function($scope, $http, toastr){

  // $http.get('/api/products').then(function (res)  {
  //   console.log(res)
  //   // $scope.products = res.data.data
  // })

  // $scope.items = [
  //   {"sid": 1, "name" : "카페카페", "location": "신촌", "tel" : '555-555', "star": 4.7, "review" : 66},
  //   {"sid": 2, "name" : "카페카페2", "location": "신촌", "tel" : '555-555', "star": 4.5, "review" : 6},
  // ]
  //
  // $scope.remove = function (index) {
  //     //confirm()
  //   $scope.items.splice(index,1)
  // }
  //


  $scope.selected = {}
  $scope.viewby = 10;
  $scope.currentPage = 1;




  $scope.list = function () {
    $http.get('/cafeinfos/requests/new?page=' + $scope.currentPage +'&rows=' + $scope.viewby ).then(function (res)  {
      console.log(res)

      $scope.totalItems = res.data.totalcount;
      $scope.itemsPerPage = $scope.viewby;
      $scope.maxSize = 10; //Number of pager buttons to show

      $scope.items = res.data.docs

    })

  }
  $scope.list()

  $scope.approve = function (item) {
    console.log(item)
    $http.put('/cafeinfos/requests/new/' + item.sid + '/approve').then(function () {
      toastr.success("카페등록이 승인 되었습니다")
      $scope.list()
    })
  }

  $scope.rejectData ={}
  $scope.reject = function (item) {
    console.log(item)
    console.log($scope.rejectData)
    $http.put('/cafeinfos/requests/new/' + item.sid + '/reject', $scope.rejectData).then(function () {
      toastr.success("카페등록이 반려 되었습니다")
      $scope.list()
    })
  }


})      