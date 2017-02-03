app.controller('angelCafeProductEditCtrl', function($scope, $state, $stateParams, AngelProduct, $timeout, $http, toastr){
  var vm = this;

  // AngelProduct.get($stateParams.code).then(function(d){
  //   console.log(d.data)
  //   vm.product = d.data
  // })

  $http.get('/api/product/' + $stateParams.code).then(function (res) {
    console.log(res)
    vm.product = res.data[0]
  })


  vm.update = function(product) {
    // AngelProduct.update(product).then(function(d){
    //   $state.go('admin.product.list')
    // })
    $http.put('/api/product/'  + $stateParams.code, product).then(function(d){
      $state.go('angelCafe.product.list')
    })
  }

  vm.delete = function(code) {
    $timeout(function() {
      // AngelProduct.remove(code).then(function(d){
      //   $state.go('admin.product.list')
      // })


      $http.delete('/api/product/'  + $stateParams.code).then(function(d){
        $state.go('angelCafe.product.list')
      })


    }, 300)
  }

})      