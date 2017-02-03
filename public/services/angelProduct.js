app.factory('AngelProduct',function($http){

  var all = function(email, startDate, endDate) {
    return $http.get( '/app/api/product/')
  }

  var get = function(code) {
    return $http.get( '/app/api/product/' + code)
  }

  var update = function(data) {
    return $http.put('/app/api/product/', {product: data})
  }

  var add = function(data) {
    return $http.post('/app/api/product/', {product: data} )
  }

  var remove = function(code) {
    return $http.delete('/app/api/product/' + code )
  }

  return {
    all: all,
    get: get,
    update: update,
    add: add,
    remove: remove
  }

})

