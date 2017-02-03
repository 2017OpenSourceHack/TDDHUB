app.controller('angelCafeProductListCtrl', function($scope, AngelProduct, $http){
  var vm = this;
  // AngelProduct.all().then(function(d){
  //   vm.products = d.data
  // })

  $http.get('/api/products').then(function (res)  {
    console.log(res)
    $scope.products = res.data.data
  })

})      