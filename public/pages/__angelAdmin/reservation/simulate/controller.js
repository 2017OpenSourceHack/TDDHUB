app.controller('angelCafeReservationSimulateCtrl', function ($scope, AngelReservation, toastr) {
  var vm = this;

  // // moment.locale('ko');

  //  // instantiate a moment object
  //   var NowMoment = moment();

  //   // instantiate a JavaScript Date object
  //   var NowDate = new Date();

  // console.log(NowMoment.format())
  // console.log(NowDate)


  vm.add = function () {
    var todayDate = moment();
    console.log(vm.product.selectedOption)

    var service_start, service_end
    if (vm.product.selectedOption.type === 'ring') {
      service_start = moment(vm.service_start).format()
      service_end = moment(vm.service_start).add(vm.product.selectedOption.minute, 'm').format()
      // console.log(vm.product.selectedOption.minute)      
    } else {
      service_start = moment(new Date()).format()
      service_end = moment(new Date()).add(vm.product.selectedOption.week, 'w').format()
      // console.log(vm.product.selectedOption.week)      
    }
    var data = {
      service_start: service_start,
      service_end: service_end,
      extend_count: [],
      extend_day: [],
      user_id: vm.user.selectedOption.id,
      user_name: vm.user.selectedOption.name,
      user_sex: vm.user.selectedOption.sex,
      user_age: vm.user.selectedOption.age,
      user_tel: vm.user.selectedOption.tel,
      angel_id: vm.angel.selectedOption.id,
      angel_name: vm.angel.selectedOption.name,
      product_type: vm.product.selectedOption.type,
      product_name: vm.product.selectedOption.name,
      product_price: vm.product.selectedOption.price,
      payment_method: vm.payment_method.selectedOption.name,
      payment_who: vm.payment_who
    }

    // var data = { 
    //   user: vm.user.selectedOption, 
    //   product: vm.product.selectedOption, 
    //   payment_method: vm.payment_method.selectedOption 
    // }

    // console.log(data)

    AngelReservation.add(data).then(function (d) {
      console.log(d)
      toastr.success('작업을 저장했습니다.');
    }, function (err) {
      console.log(err)
    })
  }

  vm.user = {
    availableOptions: [
      { id: 'user_01', name: '홍길동', sex: '남', age: 23, tel: '010-555-5555' },
      { id: 'user_02', name: '성춘향', sex: '여', age: 18, tel: '010-555-5555' },
    ],
    selectedOption:
    { id: 'user_02', name: '성춘향', sex: '여', age: 18, tel: '010-555-5555' },
  }
  vm.payment_who = '성춘향' 

  vm.angel = {
    availableOptions: [
      { id: 'angel_01', name: '아모르01' },
      { id: 'angel_02', name: '아모르02' },
      { id: 'angel_03', name: '아모르03' },
      { id: 'angel_04', name: '아모르04' },
    ],
    selectedOption:
    { id: 'angel_03', name: '아모르03' },
  }

  vm.product_type = {
    availableOptions: [
      { id: 'angel_talk', name: 'angelTalk', type: 'talk' },
      { id: 'angel_ring', name: 'angelRing', type: 'ring' },
    ],
    selectedOption:
    { id: 'angel_talk', name: 'angelTalk', type: 'talk' }
  };

  vm.product = {
    availableOptions: [
      { id: 'A01', type: 'talk', name: '엔젤talk1주일', week: 1, count: 15, price: 45000 },
      { id: 'A02', type: 'talk', name: '엔젤talk2주일', week: 2, count: 30, price: 70000 },
      { id: 'A03', type: 'talk', name: '엔젤talk4주일', week: 4, count: 60, price: 120000 },
      { id: 'B01', type: 'ring', name: '엔젤ring1', minute: 50, price: 60000 },
      { id: 'B02', type: 'ring', name: '엔젤ring2', minute: 100, price: 100000 },
    ],
    // selectedOption: 
    //   { id: 'talk_2_week', type:'talk', name: '엔젤talk2주일' },
  };

  vm.ring_service_start = ''

  vm.payment_method = {
    availableOptions: [
      { id: 'card', name: '신용카드' },
      { id: 'bank', name: '무통장입금' },
    ],
    selectedOption:
    { id: 'bank', name: '무통장입금' },
  };

  vm.thing_to_consult = "사람은 왜 사는 걸까요? 고민이 많아요. 잠을 못 자겠어요. ^^"













})      