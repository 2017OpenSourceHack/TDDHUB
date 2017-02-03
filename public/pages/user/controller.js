app.controller('user', function($scope, $http){

    $scope.menus = [
        {'menu': '카페관리', children : [
            {'menu': '카페 정보수정', 'link':'#/user/dashboard'},
            {'menu': '리뷰 관리', 'link':'#/user/dashboard'},
        ]},
        {'menu': '쿠폰 관리', children : [
            {'menu': '쿠폰 등록 요청', 'link':'#/user/dashboard'},
            {'menu': '쿠폰 발급현황 및 관리', 'link':'#/user/dashboard'},
        ]},
        {'menu': '통계', children : [
            {'menu': '카페 통계', 'link':'#/user/dashboard'},
            {'menu': '광고성과 통계', 'link':'#/user/dashboard'},
        ]},
        {'menu': '광고', children : [
            {'menu': '광고 신청', 'link':'#/user/dashboard'},
            {'menu': '광고 내역', 'link':'#/user/dashboard'},
            {'menu': '지난광고 성과', 'link':'#/user/dashboard'},
        ]},
        {'menu': '공지사항', children : [
            {'menu': '공지사항', 'link':'#/user/dashboard'},
        ]},
    ]



})      