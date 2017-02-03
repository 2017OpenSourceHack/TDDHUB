app.controller('angelCafeReservationListCtrl', function ($scope, AngelReservation, toastr) {
  var vm = this;
  AngelReservation.all().then(function (d) {
    vm.reservations = d.data
  })

  vm.add = function () {
    var data = { user_Id: 'user01', product_type: 'angelTalk', payment_method: 'credit_card' }
    AngelReservation.add(data).then(function (d) {
      console.log(d)
    }, function (err) {
      console.log(err)
    })
  }

  vm.update = function (extend, extendValue) {
    console.log('update', extend, extendValue)
    // toastr.warning('일정을 삭제했습니다.');
    console.log((vm.selected));
    var selected = Object.keys(vm.selected);
    // console.log(JSON.stringify(vm.selected));
    // var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
    // console.log(Object.keys(an_obj)); // console: ['2', '7', '100'] 

    for (var i = 0; i < selected.length; i++) {
      console.log(selected[i])
      for (var j = 0; j < vm.reservations.length; j++) {
        if (vm.reservations[j].reservation_id === selected[i]) {
          if (extend === 'day') {
            console.log(vm.reservations[j].service_end)
            var service_end = moment(vm.reservations[j].service_end).add(extendValue, 'd').format()
            // console.log(service_end, vm.reservations[j].reservation_id)
            vm.reservations[j].extend_day.push({extend:'day', date:new Date(), extend_value: extendValue})
            var data = {
              reservation_id: vm.reservations[j].reservation_id,
              service_end: service_end,
              extend_day: vm.reservations[j].extend_day,
            }

            console.log(data);

            AngelReservation.update(data).then(function (d) {
              console.log(d)
              toastr.success('작업을 저장했습니다.');
            }, function (err) {
              console.log(err)
            })





          } else {
            var service
          }
        }
      }
    }


  }

  vm.getExtendDay = function(extendDays) {
    //console.log(extendDays)
    var days = 0;
    for (var i=0; i < extendDays.length; i++) {
      days = days + extendDays[i].extend_value;
    }
    return days === 0 ? '-' : days
  }

  vm.getRemainingDay = function(item) {
    var days = moment(item.service_end).subtract(item.service_end, 'd').format('d')
    var end = moment(item.service_end)
    var start = moment(item.service_start)
    var now = moment(new Date()).subtract(1, 'd')
    var days = end.diff(start, 'days')
    var remaining = end.diff(now, 'days')
    var result = remaining + '/' + days
    if (item.product_type === 'ring') result = '-'
    return result
  }






})      