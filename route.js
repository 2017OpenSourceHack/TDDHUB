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

    //프로젝트 생성, 삭제
    app.post('/users/:sid/repositories', user.project_new);
    app.delete('/users/:sid/repositories/:rid',user.project_delete);

    //secession check
    app.get('/cafeinfos2', jwtCheck, function (req, res) {
        res.send('ok');
    });
};
