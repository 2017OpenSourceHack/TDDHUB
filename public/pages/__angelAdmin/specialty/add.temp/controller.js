app.controller('angelCafeProductAddCtrl', function($scope, $state, AngelProduct, toastr){
  var vm = this;
  // $scope.angels = AngelUser.all()
  // console.log('addCtrl')
  // name type [angel_talk, angel_ring] code talk_count talk_day ring_minute 
  // discount_pirce angel_prifit member_text_first member_text angle_text_first angel_text
  vm.code = 'A01'
  vm.name = 'angel_talk_1week'
  vm.type = 'angel_talk'
  vm.talk_count = 10
  vm.talk_day = 10 
  vm.ring_minute = 10
  vm.price = 10
  vm.angel_profit = 10 
  vm.discount_price = 10 
  vm.angel_prifit = 10 
  vm.member_text_first = 10 
  vm.member_text = 10 
  vm.angel_text_first = 10 
  vm.angel_text = 10

  vm.add = function(item) {
    console.log('add ...........')
    console.log(item)
    AngelProduct.add(item).then(function(){
      console.log("OK")
      $state.go('angelCafe.product.list')
    }, function(err) {
      toastr.error(err.data);
    })
    
  }

})      