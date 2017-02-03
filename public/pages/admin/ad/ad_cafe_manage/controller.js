app.controller('admin.ad.ad_cafe_manage', function($scope, $http){

  // $http.get('/api/products').then(function (res)  {
  //   console.log(res)
  //   // $scope.products = res.data.data
  // })


  // <tr>
  // <th>종류</th>
  // <td>{{}}</td>
  // </tr>
  // <tr>
  // <th>쿠폰이름</th>
  // <td>{{}}</td>
  // </tr>
  // <tr>
  // <th>상세내용</th>
  // <td>{{}}</td>
  // </tr>
  // <tr>
  // <th>발급매</th>
  // <td>{{}}</td>
  // </tr>
  // <tr>
  // <th>기한</th>
  // <td>{{}}</td>
  // </tr>
  // <tr>
  // <th>비고</th>
  // <td>{{}}</td>
  // </tr>



  $scope.items = [
    {"sid": 1, "name" : "카페카페", "coupon": "아메리카노 1+1 ", "type" : 'type1', "detail": "크리스마스 이벤트", "total_tickets" : 66, "date_to" : '2016/12/25', "remarks" : "크리스마스 특별 이벤트 할인행사를 합니다.."},
    {"sid": 1, "name" : "카페카페", "coupon": "아메리카노 1+1 ", "type" : 'type1', "detail": "크리스마스 이벤트", "total_tickets" : 66, "date_to" : '2016/12/25', "remarks" : "크리스마스 특별 이벤트 할인행사를 합니다.."},
  ]

  $scope.remove = function (index) {
      //confirm()
    $scope.items.splice(index,1)
  }


})      