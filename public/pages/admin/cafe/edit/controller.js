app.controller('admin.cafe.edit', function ($scope, $rootScope, $state, toastr, $http, $stateParams) {

    console.log($stateParams)

    $http.get('/cafeinfos/' + $stateParams.id).then(function (res) {
        console.log(res)
        // $scope.products = res.data.data
        $scope.item = res.data
    })


    $scope.new_menu = {"name": "", "price": 0}
    $scope.addMenu = function () {
        $scope.item.menu.push(angular.copy($scope.new_menu))
        $scope.new_menu.name = "";
        $scope.new_menu.price = 0;

    }
    $scope.removeMenu = function (index) {
        $scope.item.menu.splice(index, 1)
    }


    $scope.onChange = function (e, fileList) {
        // alert('this is on-change handler!');
    };

    $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
        // // alert('this is handler for file reader onload event!');
        // console.log(file)
        // console.log(fileObj)
        // file = null;
        $scope.item.photos.push({"link": "b.png", "base64": fileObj.base64})
    };

    var uploadedCount = 0;

    $scope.files = [];

    $scope.removePhoto = function (index) {
        $scope.item.photos.splice(index, 1)
    }

    $scope.file_changed = function (element) {

        // console.log($scope.item.photos)
        //
        // $scope.$apply(function (scope) {
        //     var photofile = element.files[0];
        //     var reader = new FileReader();
        //     var fd = new FormData();
        //     fd.append('file', photofile);
        //     $http.post('/api/photos/', fd, {
        //         transformRequest: angular.identity,
        //         headers: {'Content-Type': undefined}
        //     }).then(function (res) {
        //         $scope.photoUrl = "/photos/" + res.data
        //         $scope.item.photos.push({url: "/photos/" + res.data})
        //         console.log($scope.item.photos)
        //     }, function (err) {
        //         console.log("error", err)
        //     });
        // });

        $scope.$apply(function (scope) {
            var photofile = element.files[0];
            var reader = new FileReader();
            var fd = new FormData();
            fd.append('file', photofile);
            $http.post($rootScope.baseUrl + '/api/photos/', fd, {   //  '/api/photos/'
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                $scope.item.photos.push({url: $rootScope.baseUrl + "/photos/" + res.data})
            }, function (err) {
                console.log("error", err)
            });
        });

    };



    $scope.save = function () {
        // if ($scope.item.tags == undefined || $scope.item.tags.lenght < 2) {
        //     toastr.error("최소 2개 메뉴를 등록해야 합니다.");
        //     return;
        // }

        console.log($scope.item.tags)
        if ($scope.item.tags && $scope.item.tags.constructor !== Array) {
            $scope.item.tags = $scope.item.tags.split(",");
        }
        delete $scope.item._id
        $http.put('/cafeinfos/' + $stateParams.id, $scope.item).then(function () {
            // console.log("success")
            $state.go('admin.cafe.list')
        })
    }
})
