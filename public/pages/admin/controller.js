app.controller('admin', function($scope, $http){

    $scope.menus = [
        {'menu': '카페관리', children : [
            {'menu': '카페 목록', 'link':'#/admin/cafe/list'},
            {'menu': '카페 생성', 'link':'#/admin/cafe/new'},
            {'menu': '신규카페 등록 승인', 'link':'#/admin/cafe/new_cafe_approve'},
            {'menu': '쿠폰 등록 승인', 'link':'#/admin/cafe/coupon_approve'},
            {'menu': '수정요청 승인', 'link':'#/admin/cafe/edit_approve'},
            {'menu': '타이틀 관리', 'link':'#/admin/cafe/title_manage'},
        ]},
        // {'menu': '카페관리자 관리', children : [
        //     {'menu': '카페관리자 관리', 'link':'#/admin/cafe/manager_manage'},
        // ]},
        {'menu': '광고', children : [
            {'menu': '광고요청 관리', 'link':'#/admin/ad/ad_request_manage'},
            {'menu': '광고카페 관리', 'link':'#/admin/ad/ad_cafe_manage'},
            {'menu': '이벤트', 'link':'#/admin/ad/ad_event_manage'},
        ]},
        {'menu': '통계', children : [
            {'menu': '카페목록', 'link':'#/admin/statistic/cafe_list_statistic'},
            {'menu': '회원통계', 'link':'#/admin/statistic/user_statistic'},
            {'menu': '검색통계', 'link':'#/admin/statistic/search_statisict'},
            {'menu': '광고카페 목록', 'link':'#/admin/statistic/ad_cafe_statistic'},
        ]},
        {'menu': '공지사항', children : [
            {'menu': '공지사항', 'link':'#/admin/board/list'},
        ]},
        {'menu': '문의', children : [
            {'menu': '관리자 문의', 'link':'#/admin/faq/manager'},
            // {'menu': '유저 문의', 'link':'#/admin/faq/user'},
            {'menu': '리뷰 신고', 'link':'#/admin/faq/review'}
        ]},
    ]


})
