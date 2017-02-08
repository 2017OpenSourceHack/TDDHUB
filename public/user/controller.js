app.controller('authlogin', function ($scope, $rootScope, $state, $stateParams, $window, $http, toastr, $auth) {
  $scope.user = {
        email: "test@nss.sss",
        password: "123123"
    };

  $scope.login = function (user) {
    if (
            user.email === undefined ||
            user.password === undefined
        ) {
            $scope.error = "Please fill in every field.";

            return;
        }
        $auth.login(user)
        .then(function () {
                console.log("LOGIN SUCCESS");
                $rootScope.user = $auth.getPayload();
                console.log($rootScope.user);
                $state.go('project.list');
            })
            .catch(function (error) {
                toastr.error("Login Error");
                console.log(error);
          });

    };

    // $http.post('/users/signin').then(function (res) {
    //   console.log(res)
    //   // $scope.items = res.data.docs
    //   $scope.go('project.list');
    // })


  $scope.signup = function (user) {
    if(user.password != user.confirmpassword){
         toastr.error("Check Your Password Again.");
      return ;
    }

    $http.post('/users/signup',user).then(function (res) {
      console.log(res);
      toastr.success("Welcome ! Please Login Again");
      $state.reload();
    },function (err) {
            toastr.error("Signup failure");
        });
  };




});
