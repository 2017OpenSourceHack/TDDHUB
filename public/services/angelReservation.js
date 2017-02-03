app.factory('AngelReservation',function($http){

  var all = function() {
    return $http.get('/app/api/reservation/')
  }

  var add = function(data) {
    return $http.post('/app/api/reservation', data)
  }

  var update = function(data) {
    return $http.put('/app/api/reservation', data)
  }

  return {
    all: all,
    add: add,
    update: update
  }

})

