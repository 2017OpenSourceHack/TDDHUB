app.controller('angelCafeScheduleListCtrl', function ($scope, $rootScope, AngelUser, AngelSchedule, toastr) {
  var vm = this

  function getWeeks(weekIndex) {
    var weekIndex = (weekIndex) ? weekIndex : 0
    var weeks = []
    var arr = ['월', '화', '수', '목', '금', '토', '일']
    var d = new Date();
    var startDate = d.setDate( d.getDate() - (( (d.getDay() + 6) % 7 ) - (weekIndex * 7) - 0 )) 
    startDate = (new Date(startDate)).yyyymmdd()
    d = new Date(startDate)
    var endDate = d.setDate( d.getDate() + 6 )
    endDate = (new Date(endDate)).yyyymmdd()
    AngelSchedule.all($rootScope.user.email, startDate, endDate).then(function(result){
      for (var i=0; i < result.data.length; i++) {
        result.data[i].dateValue = (new Date(result.data[i].date)).yyyymmdd()
      }
      d = new Date(startDate)
      d.setDate( d.getDate() - 1 )  // Offseted Sunday
      for (var i=0; i < arr.length; i++) {
        d.setDate(d.getDate() + 1)
        var schedules = []
        var date = (d).yyyymmdd()
        var object = result.data.filter(function(obj){
          return (obj.dateValue === date)
        })[0]
        if (object) {
          weeks.push({ "dateText": (d).yyyymmdd() + ' (' +arr[i] + ')', "dateValue": d.yyyymmdd(), "schedules" : object.schedules })
        } else {
          for (var j=0; j < 24; j++) {
            schedules.push(false);
          }
          weeks.push({ "dateText": (d).yyyymmdd() + ' (' +arr[i] + ')', "dateValue": d.yyyymmdd(), "schedules" : schedules })
        }
      } 
      vm.weeks = weeks
    })
  }

  vm.weekIndex = 0
  getWeeks(vm.weekIndex)
  vm.changeWeek = function(value) {
    if (value === 0) {
      vm.weekIndex = vm.weekIndex - vm.weekIndex
    } else {
      vm.weekIndex = vm.weekIndex + value
    }
    getWeeks(vm.weekIndex)
  }

  vm.toggleSchedule = function(date, index, schedule) {
    console.log(date, index, schedule)
    date.schedules[index] = !schedule
    // var updateScheduleString = date
    // var data = {email:$rootScope.user.email, date:date.dateValue, schedules: JSON.stringify(date.schedules)}
    var data = {email:$rootScope.user.email, date:date.dateValue, schedules: date.schedules}
    
    AngelSchedule.update(data).then(function(){
      if (schedule) {
        toastr.warning('일정을 삭제했습니다.');
      } else {
        toastr.success('일정을 추가했습니다.');
      }
    }, function(data) {
      toastr.error('<span>에러가 발생하여 데이터를 저장하지 못했습니다. <span><br>' + JSON.stringify(data),  'Error', {
        allowHtml: true,
        closeButton: true,
        tapToDismiss: false,
        extendedTimeOut: 0,
        timeOut: 0
      });
      date.schedules[index] = schedule
    })
  }

})      