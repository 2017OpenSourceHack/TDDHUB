var interceptor = function($q, $location) {
	return {
		request: function (config) {
			// console.log(config)
			return config;
		},

		response: function (result) {
			// console.log(result)
			return result;
		},

		responseError: function (rejection) {
			console.log('Failed with', rejection.status, 'status');
			if (rejection.status == 401 || rejection.status == 403) {
				$location.url('/login');
			}
			return $q.reject(rejection);
		}
	};
};

var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'satellizer', 'toastr','ngAnimate', 'ui.bootstrap.datetimepicker']);


app.config(function ($httpProvider, toastrConfig) {
	$httpProvider.interceptors.push(interceptor);
});

app.run(function ($rootScope, $state, $stateParams, $http, $window, $auth) {

	console.log("app.run -------------");

	$rootScope.user = $auth.getPayload();
	$rootScope.baseUrl = "http://localhost:3010";

	$rootScope.$stateParams = $stateParams;
	$rootScope.$state = $state;


	$rootScope.$on('$stateChangeStart',
		function (event, toState) {
			if (toState.data && toState.data.requiredLogin && toState.data.requiredAdmin) {
		// console.log(" >>>>>>>>>>>>>>> requiredAdmin ... but not admin ... got logoin")
		// console.log($rootScope.user)

		if ( $rootScope.user && $rootScope.user.role != 'admin') {
			// Required !!!!!!
			event.preventDefault();
			$state.go('login');
		}
	}
		});

});


app.controller('ModalController', function($scope, close) {
    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

});
