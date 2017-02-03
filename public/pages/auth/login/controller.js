app.controller('authlogin', function ($scope, $rootScope, $state, $stateParams, $window, $http, toastr, $auth) {

    $scope.loginuser = {
        email: "admin@gmail.com",
        password: "admin"
    };

    $scope.loginuser2 = {
        email: "shpongle2634@gmail.com",
        password: "123123"
    };


    $scope.login = function (user) {

        if (
            user.email === undefined ||
            user.password === undefined
        ) {
            $scope.error = "Please fill in every field."
            return
        }


        $auth.login(user)
            .then(function () {

                console.log("LOGIN SUCCESS")

                $rootScope.user = $auth.getPayload()
                console.log($rootScope.user)

                if ($rootScope.user.role === 'manager')
                    $state.go('user.dashboard')

                if ($rootScope.user.role === 'admin')
                    $state.go('admin.cafe.list')


                // toastr.success('You have successfully signed in!');
                // if ($rootScope.redirectUrl) {
                //     $location.path($rootScope.redirectUrl);
                //     $rootScope.redirectUrl = undefined
                //     console.log(">>>>> call after $location.path")
                // } else {
                //     $location.path('/iot/hub');
                // }z
            })
            .catch(function (error) {
                console.log(error)
                // toastr.error(error.data.message, error.status);
            });


        // //
        // $http.post('/sessions/create', user).then(function (res) {
        //
        //   // $rootScope.user = res.data.user
        //   // $window.localStorage.setItem('user', JSON.stringify($scope.user))
        //
        //   console.log(res)
        //   // toastr.success("Login success")
        //
        //   if (res.data.isadmin) {
        //     $state.go('admin.dashboard')
        //   } else {
        //     $state.go('user.dashboard')
        //   }
        //
        //
        // }, function (err) {
        //   toastr.error("Login failure")
        // })


    }


    $scope.logout = function () {
        // $http.get('/auth/unlink').then(function (res) {
        //
        //   // toastr.success("Logout success")
        //   $window.localStorage.clear('user')
        //   $state.go('login')
        //
        // }, function (err) {
        //   toastr.error("Logout failure")
        // })
        $auth.logout().then(function () {
            $state.go('login')
        })
    }


    //
    // $window.localStorage && $window.localStorage.setItem('my-storage', "abc");
    //
    // console.log($window.localStorage)

    //
    // $scope.appTitle = "Katie's Awesome ToDo App";
    // $scope.appHeadline = "This one will save to local storage!";
    // $scope.saved = localStorage.getItem('todos');
    // $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ {text: 'Learn AngularJS', done: false}, {text: 'Build an Angular app', done: false} ];
    // localStorage.setItem('todos', JSON.stringify($scope.todos));
    //
    // $scope.addTodo = function() {
    //   $scope.todos.push({
    //     text: $scope.todoText,
    //     done: false
    //   });
    //   $scope.todoText = ''; //clear the input after adding
    //   localStorage.setItem('todos', JSON.stringify($scope.todos));
    // };
    //
    // $scope.remaining = function() {
    //   var count = 0;
    //   angular.forEach($scope.todos, function(todo){
    //     count+= todo.done ? 0 : 1;
    //   });
    //   return count;
    // };
    //
    // $scope.archive = function() {
    //   var oldTodos = $scope.todos;
    //   $scope.todos = [];
    //   angular.forEach(oldTodos, function(todo){
    //     if (!todo.done)
    //       $scope.todos.push(todo);
    //   });
    //   localStorage.setItem('todos', JSON.stringify($scope.todos));
    // };
    //


    // console.log($state)
    //
    //
    // // $scope.angels = AngelUser.all()
    // // console.log('addCtrl')
    //
    // vm.add = function(user) {
    //   // alert("add .... ")
    //   // console.log('add user............')
    //   // $http.post('/api/angelusers', sample_angel).then(function(resutl) {
    //   //   alert("success")
    //   // }, function(err) {
    //   //   alert(err)
    //   // })
    //
    //   console.log(user);
    //   // return;
    //   AngelUser.add(user).then(function(data){
    //     console.log(data)
    //     toastr.success('상담사를 추가했습니다.');
    //   }, function(err){
    //     toastr.error(err);
    //   })
    // }
    //
    // vm.duplicateCheckId = function(id) {
    //   console.log('id check')
    // }
    //
    // vm.duplicateCheckAlias = function(alias) {
    //   console.log('alias check')
    // }


})
