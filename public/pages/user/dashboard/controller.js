app.controller('userdashboard', function($scope, $http){

    $http.get('/cafeinfos2').then(function (res) {
        console.log(res)
    })

})