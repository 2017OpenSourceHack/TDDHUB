app.controller('admin.cafe.new', function ($scope, $rootScope, $state, $http, toastr) {
    /*
     //
     // 카페명
     // 전화번호    | 사업자등록샇의 전화번호를 입력해주세요. (하이픈(-)제외)
     // 카페주소    |
     // 사업자등록번호 : 숫자만 입력 해주세요. (하이픈(-)제외)
     // 영업시간 : 평일  09:00 ~18:00
     // 주말   09:00 ~ 23:00
     // 24시간제로 입력해 주세요.
     //     편의시설 : wifi, parking, 24시, 화장실(내부), 흡연
     // 태그 : 쉼표로 구분해 주세요
     // 콘센트수 : 숫자만 입력해 주세요
     // 좌석수 : 숫자만 입력해 주세요
     // 메뉴 :                         메뉴명 ,  가격 최소2개등록 필수         메뉴명, 가격
     // 원할경우 + 버튼을         등록한 메뉴는 앱 내에서 검색시 노출됩니다.
     //     눌러 추가등록 가능
     // 사진등록         | 사진등록하기   업로드가능 확장자 :  jpg, png
     //
     // 처음 등록한 사진이 카페의 대표이미지가 됩니다. 사진은 5개까지 등록가능합니다. 권장이미지 사이즈 : 1920 x 1080
     //
     // checkbox  이용약관과 개인정보보호 정책에 동의 합니다     가페등록, 취소
     */
    $scope.item = {
        "name": "카페카페",
        "tel": "555-5555",
        "addr": "서울시 종로구 종로1 256번지",
        "reg_number": "12313413423",
        "week_start_hour": "08",
        "week_start_min": "00",
        "week_end_hour": "20",
        "week_end_min": "00",
        "holi_start_hour": "08",
        "holi_start_min": "00",
        "holi_end_hour": "23",
        "holi_end_min": "00",
        "facilities": [
            {"name": "wifi", "value": true},
            {"name": "주차", "value": false},
            {"name": "24시", "value": false},
            {"name": "화장실(내부)", "value": false},
            {"name": "흡연", "value": false},
            {"name": "plug", "value": false},
        ],
        "tags": "위치좋음, 전망좋음",
        "plugs": 10,
        "seats": 50,
        "menu": [
            {"name": "아메리카노", "price": 4500},
            {"name": "고구마라떼", "price": 3500},
        ],
        "photos": [],
        "total_favorites" : 0,
        "total_reviews" : 0,
        "total_stars" : 0
    }

    // $scope.remove = function (index) {
    //   $scope.items.splice(index,1)
    // }

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
        console.log($scope.item)
        if ($scope.item.menu.length < 2) {
            toastr.error("최소 2개 메뉴를 등록해야 합니다.");
            return;
        }
        $scope.item.tags = $scope.item.tags.split(",");
        $http.post('/cafeinfos', $scope.item).then(function () {
            // console.log("success")
            $state.go('admin.cafe.list')
        }, function (res) {
            if (res.status == 409) {
                toastr.error("Error. Cafe명이 중복되었습니다.")
            }
        })
    }


})
