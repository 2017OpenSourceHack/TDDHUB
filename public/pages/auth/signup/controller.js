app.controller('authsignup', function($scope, $rootScope, $state, $stateParams, $http, toastr){

    $scope.user ={
        email : "shpongle2634@gmail.com",
        password : "123123",
        name :"서태훈",
        tel : "01071377034",
        role: "manager",
        regist_num:"123-12-12345",
        created: new Date(),     //등록일
        last_login: new Date(),  //마지막 로그인 일시
    };

    $scope.signup = function (user) {

         $http.post('/users/signup', user).then(function (res) {

            // $rootScope.user = res.data.user
            // $window.localStorage.setItem('user', JSON.stringify($scope.user))

            console.log(res)
            // toastr.success("Login success")

            if (res.data.isadmin) {
                $state.go('admin.dashboard')
            } else {
                $state.go('login')
            }


        }, function (err) {
            toastr.error("Login failure")
        })
    }


})
