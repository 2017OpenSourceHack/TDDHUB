app.factory('Specialty',function($http){

  var all = function() {
    return $http.get( '/app/api/specialty')
  }

  var update = function(data) {
    return $http.post('/app/api/specialty/', data)
  }

  return {
    all: all,
    update: update,
  }

})

