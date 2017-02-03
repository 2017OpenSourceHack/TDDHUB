app.factory('AngelUser',function($http){

  // 번호	이메일 (로그인 아이디)	별명	나이	성별	대표성향	OS	경고수	회원등급	회원상태	가입일 	로그인
  // 1	ss02283@naver.com	bbom2	21	여	                  	iOS	0   	일반회원	정상	2016-07-19	2016-07-19

  // var users = [
  //   { "id": "1", "email":"ss02283@naver.com",  "alias":"bbom2", "age": "26", "sex":"여", "char":"조용함", "os":"ios", "warning":"0", "level":"angel", "status":"정상", "startdate":"2016-07-19", "login":"2016-07-19" },
  //   { "id": "2", "email":"aaa@naver.com",  "alias":"aaa", "age": "26", "sex":"여", "char":"조용함", "os":"ios", "warning":"0", "level":"angel", "status":"정상", "startdate":"2016-07-19", "login":"2016-07-19" },
  // ]

  var service = {}

  service.all = function () {
    return $http.get('/api/angelusers')
  }

  service.get = function (userId) {
    return $http.get('/api/user/' + userId)
  }

  service.add = function (user) {
    return $http.post('/api/angelusers/', user)
  }

  service.delete = function (userId) {
    return $http.delete('/api/angelusers/' + userId)
  }

  service.update = function (user) {
    return $http.put('/api/user/' + user.angeluser_sn, user)
  }

  return service;

})

