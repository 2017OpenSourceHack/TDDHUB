app.controller('angelCafeScheduleListCtrl', function ($scope, AngelUser, toastr) {
  var vm = this
  // var curr = new Date
  // var firstday   

  function getWeeks(weekIndex) {
    // var weekIndex = (weekIndex == undefined) ? 0 : weekIndex
    var weekIndex = (weekIndex) ? weekIndex : 0
    var weeks = []
    var arr = ['월', '화', '수', '목', '금', '토', '일']

    var d = new Date();
    console.log(weekIndex)

    vm.sunday = d.setDate( d.getDate() - (d.getDay() - (weekIndex * 7) ));  // Sunday
    for (var i=0; i < arr.length; i++) {
      d.setDate(d.getDate() + 1)
      console.log((d).yyyymmdd() + ' (' +arr[i] + ')')
      weeks.push({ "dateText": (d).yyyymmdd() + ' (' +arr[i] + ')', "dateValue": d.yyyymmdd() })
    } 
    return weeks   
  }

  vm.weekIndex = 0
  vm.weeks = getWeeks(vm.weekIndex)
  vm.addWeek = function(value) {
    if (value === 0) {
      vm.weekIndex = vm.weekIndex - vm.weekIndex
    } else {
      vm.weekIndex = vm.weekIndex + value
    }
    vm.weeks = getWeeks(vm.weekIndex)
  }

  vm.getData = function(date, time) {
    // console.log(data, time)
    if (time === 7) {
      return true
    } else {
      return false
    }
  }

  vm.toggleCellSchedule = function(date, time) {
    // console.log(data, time)
    if (time === 7) {
      return true
    } else {
      return false
    }
  }
  

  // var d = new Date(twDate); 
  // return new Date(d.toISOString().replace("Z", "-02:00")).toISOString().replace(".000", "");
  //.toISOString().slice(0,-5).replace("T", " ");

  // yyyymmdd 형태로 포매팅된 날짜 반환


  // console.log((d).yyyymmdd());

  // vm.weeks = [
  //   { "dateText": '2016-07-18 (월)', "dateValue": "2016-07-18" },
  //   { "dateText": '2016-07-19 (화)', "dateValue": "2016-07-19" },
  //   { "dateText": '2016-07-20 (수)', "dateValue": "2016-07-20" },
  //   { "dateText": '2016-07-21 (목)', "dateValue": "2016-07-21" },
  //   { "dateText": '2016-07-22 (금)', "dateValue": "2016-07-22" },
  //   { "dateText": '2016-07-23 (토)', "dateValue": "2016-07-23" },
  //   { "dateText": '2016-07-24 (일)', "dateValue": "2016-07-24" },
  // ]
  vm.toast = function () {
    toastr.success('I don\'t need a title to live');
  }

})      