app.controller('apitest', function ($scope, $http, toastr) {

    console.log(toastr)
    // toastr.info("started",'Click to dismiss', {timeOut: 0})
    console.log("apitest controller")


    $scope.selected = {}
    $scope.items = []

    $scope.methods = ['post', 'get', 'put', 'delete']

    $scope.services = ["aaa", "bbbb"]

    $scope.addService = function (service) {
        $scope.services.push(service)
    }

    $scope.load = function () {
        $http.get('/restapis', $scope.new).then(function (result) {
            // console.log(result)
            function compare(a, b) {
                if (a.url.toLowerCase() < b.url.toLowerCase())
                    return -1;
                if (a.url.toLowerCase() > b.url.toLowerCase())
                    return 1;
                return 0;
            }

            result.data.sort(compare);
            $scope.items = result.data
        })
    }
    $scope.load()


    // $scope.show = function () {
    //     ModalService.showModal({
    //         templateUrl: 'modal.html',
    //         controller: "ModalController"
    //     }).then(function (modal) {
    //         modal.element.modal();
    //         modal.close.then(function (result) {
    //             $scope.message = "You said " + result;
    //         });
    //     });
    // };

    $scope.new = {
        method: "",
        url: "",
        data: ""
    }

    $scope.add = function () {
        if (!$scope.new.method) {
            toastr.error('method를 선택하세요');
            return
        }
        if (!$scope.new.url) {
            toastr.error('url을 입력하세요');
            return
        }
        $scope.new.url = $scope.new.url.toLowerCase()

        // console.log($scope.new.data.length)

        try {
            if ($scope.new.data.length>0) {
                var testIfJson = JSON.parse($scope.new.data);
                if (typeof testIfJson == "object") {
                    // toastr.success('JSON');
                    // $scope.new.data = testIfJson
                }
                else {
                    toastr.error('Data is not valid JSON');
                    return;
                }
            }
        }
        catch (err) {
            toastr.error('Error. ' + err);
            return;
        }

        //$scope.items.push($scope.new)
        $http.post('/restapis', $scope.new).then(function () {
            $scope.load()
            $scope.new = {
                method: "",
                url: "",
                data: ""
            }
        })
    }

    $scope.delete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1)
        $http.delete('/restapis/' + item.sid)
    }

    $scope.test = function (item) {
        console.log(item)
        $http.put('/restapis/' + item.sid, item)
        console.log(item)
        // if (cmd=='list') {
        //
        //     //$http.post()
        //
        //
        //     $http.get('/cafeinfos').then(function (result) {
        //         $scope.result = result
        //     }, function (error) {
        //         console.log(error)
        //         $scope.result = error
        //     })
        // }

        if (item.method === 'post') {
            $http.post(item.url, item.data).then(function (result) {
                toastr.success('Success');
            }, function (error) {
                toastr.error('Error');

            })
        } else if (item.method === 'put') {
            $http.put(item.url, item.data).then(function (result) {
                toastr.success('Success');
            }, function (error) {
                toastr.error('Error');

            })
        } else if (item.method === 'delete') {
            $http.delete(item.url).then(function (result) {
                toastr.success('Success');
            }, function (error) {
                toastr.error('Error');

            })
        } else if (item.method === 'get') {
            $http.get(item.url).then(function (result) {
                toastr.success('Success');
            }, function (error) {
                toastr.error('Error');
            })
        }
    }

    $scope.update = function (item) {
        console.log(item)

        delete item._id

        $http.put('/restapis/' + item.sid, item).then(function () {

        }, function () {
            alert("update error")
        })
    }

})


