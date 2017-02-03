app.factory('AngelSchedule',function($http){
  // var url = ''
  // if ( (window.location.href).indexOf('mindcafe') > -1 ) {
  //   url = 'http://testadmin.mindcafe.co.kr/app/api/schedule/'
  // } else {
  //   url = 'http://127.0.0.1:3500/app/api/schedule/'
  // }
  var url = '/app/api/schedule/' 
  console.log(window.location.href)
  console.log(url)
  var all = function(email, startDate, endDate) {
    return $http.get( url + email + '/' + startDate + '/' + endDate )
  }

  var update = function(data) {
    console.log(data)
    return $http.put(url, data)
  }

  return {
    all: all,
    update: update
  }

})

