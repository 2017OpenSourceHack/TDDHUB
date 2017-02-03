function swap(input, index_A, index_B) {
    var temp = input[index_A];
 
    input[index_A] = input[index_B];
    input[index_B] = temp;
}

app.controller('angelCafeSpecialtyListCtrl', function($scope, Specialty, toastr){
  var vm = this;
  vm.specialtyList = []
  Specialty.all().then(function(d){
    console.log(d.data)
    if (d.data.length > 0) {
      vm.specialtyList = d.data[0].specialties
    }
  })

  vm.add = function(newItem) {
    // alert('aaa')
    vm.specialtyList.push(newItem)
    vm.newItem = ''
    Specialty.update({specialties: vm.specialtyList}).then(function(d){
    })

  }

  vm.delete = function(index) {
    vm.specialtyList.splice(index, 1)
    Specialty.update({specialties: vm.specialtyList}).then(function(d){
    })
  }

  vm.changed = function(index, item) {
    if (vm.specialtyList[index] !== item) {
      console.log('changed ', item)
      vm.specialtyList[index] = item
      Specialty.update({specialties: vm.specialtyList}).then(function(d){
        toastr.success('데이터 저장 완료')
      })
    }
  }

  vm.swapDown = function(index) {
    swap(vm.specialtyList,index,index+1)
    Specialty.update({specialties: vm.specialtyList}).then(function(d){
    })
  }

  vm.swapUp = function(index) {
    swap(vm.specialtyList,index,index-1)
    Specialty.update({specialties: vm.specialtyList}).then(function(d){
    })
  }

})      