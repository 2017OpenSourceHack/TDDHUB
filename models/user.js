var mongoClient = require('mongodb').MongoClient;
var bcrypt = require("bcrypt-nodejs");
var jwt     = require('jsonwebtoken');
var co = require('co');
var model =require('./common_model');
var config = require('../config');
var db;
var collection;
mongoClient.connect(config.connectionString, function (err, database) {
    if (err)
        console.log(err);
    else {
        db = database;
    }
});


//로그인
exports.signin = function(req, res) {
	co(function*(){
    var args = { email : req.body.email};

    //db에서 정보가져올때까지 홀드 다음 문장 실행안함.
    var result=yield model.findOneDoc(args, db.collection('users'));
    if (!bcrypt.compareSync(req.body.password, result.password) ) { //암호화
              return res.status(401).send("Autheication failed");
          }
          delete result.password;
          var lastlogin = yield model.partialUpdate(args,{$set:{last_login : new Date()}},db.collection('users'));
          if(lastlogin.n===1){
            var token = createToken(result);
            console.log(token);
          res.status(201).send({
              id_token: token
          });
        }
	}).catch(function(err){
		console.log(err);
		res.status(500).send(err);
	});
};

exports.signup =function(req,res){
  co(function*(){
    var result = yield model.insertDoc(req.body, db.collection('users'));
    if(result.n ===1 )
    res.status(200).send();
    else res.status(400).send();
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};
