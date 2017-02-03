app.controller('angelCafeProductEditCtrl', function($scope, $state, $stateParams, AngelProduct, $timeout, toastr){
  var vm = this;

  AngelProduct.get($stateParams.code).then(function(d){
    console.log(d.data)
    vm.product = d.data
  })

  vm.update = function(product) {
    AngelProduct.update(product).then(function(d){
      $state.go('angelCafe.product.list')
    })
  }

  vm.delete = function(code) {
    $timeout(function() {
      AngelProduct.remove(code).then(function(d){
        $state.go('angelCafe.product.list')
      })
    }, 300)
  }

})      