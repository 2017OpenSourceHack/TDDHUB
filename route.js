var jwt     = require('express-jwt');
var config  = require('./config');
// var fs = require('fs');

var jwtCheck = jwt({
    secret: config.secret
});


// var service = require('./model/service.js');
var user = require('./models/user.js');

module.exports = function (app) {
    //회원가입, 로그인
    app.post('/users/signup', user.signup);
    app.post('/users/signin', user.signin);//

    //프로젝트 생성, 삭제, 리스트
    app.post('/users/:sid/projects', user.project_new);
    app.delete('/users/:sid/projects/:rid',user.project_delete);
    app.get('/users/:sid/projects', user.project_list);
    app.get('/users/:sid/projects/:rid', user.project_view);
    app.post('/users/:sid/projects/:rid/categories', user.category_new);
    app.delete('/users/:sid/projects/:rid/categories', user.category_delete);
    //secession check
    app.get('/cafeinfos2', jwtCheck, function (req, res) {
        res.send('ok');
    });
};
