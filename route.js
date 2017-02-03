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

    //secession check
    app.get('/cafeinfos2', jwtCheck, function (req, res) {
        res.send('ok');
    });
};
