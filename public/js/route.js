app.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
  $urlRouterProvider.otherwise("/login");
    $stateProvider
    .state('login', {
                url: "/login",
                templateUrl: "user/dujinlogin.html",
                controller: "authlogin",
            })
        // 프로젝트 리스트

    $stateProvider
    .state('project', {
        url: "/project",
        abstract: true,
        templateUrl: "project/list/index.html",
        controller: "project.list"
    })
        .state('project.list', {
            url: "/list",
            templateUrl: "project/list/index.html",
            controller: "project.list",
            data: {
                requiredLogin: true
            }
        })
        .state('project.detail', {
            url: "/detail",
            templateUrl: "project/detail/detail.html",
            controller: "project.detail",
            data: {
                requiredLogin: true
            }
        });

    $authProvider.httpInterceptor = function ($auth) {
        return true;
    };
    $authProvider.withCredentials = false;
    $authProvider.tokenRoot = null;
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = 'users/signin';  //'/users/login';
    $authProvider.signupUrl = 'users/signup';
    $authProvider.tokenName = 'id_token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.tokenHeader = 'Authorization';
    $authProvider.tokenType = 'Bearer';
    $authProvider.storageType = 'localStorage';


    /*
     * Helper auth functions
     */
    var skipIfLoggedIn = function ($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    };

    var loginRequired = function ($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/login');
        }
        return deferred.promise;
    };


});
