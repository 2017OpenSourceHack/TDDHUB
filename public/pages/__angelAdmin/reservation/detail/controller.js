app.controller('angelCafeReservationDetailCtrl', function($scope, AngelUser){
  var vm = this;
  vm.angels = AngelUser.all()
  // console.log($scope.angels)
  vm.message = "wellcome"
})      