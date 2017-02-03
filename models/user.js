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

function createToken(user) {
    // return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
    return jwt.sign(user, config.secret, { expiresIn: 60*60*5 });
}
//로그인
exports.signin = function(req, res) {
	co(function*(){
    var args = { email : req.body.email};

    //db에서 정보가져올때까지 홀드 다음 문장 실행안함.
    var result=yield model.findOneDoc(args, db.collection('users'));
    if(result){
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
    }else res.status(404).send('No User');
	}).catch(function(err){
		console.log(err);
		res.status(500).send(err);
	});
};

//회원가입
exports.signup =function(req,res){
  co(function*(){
    var args = {email : req.body.email};
        var valid = yield model.findDoc(args, db.collection('users'));
        if(!valid) {
          req.body.password = bcrypt.hashSync(req.body.password);
          req.body.created = new Date();
          var result= yield model.insertDoc(req.body, db.collection('users'), 'userid');
          if(result){
            res.status(200).send(result);
          }else res.status(500).send('Internal Error');
        }  else res.status(409).send('Duplicate error');
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};


//회원 탈퇴
//로그아웃

//프로젝트 생성
exports.project_new =function(req,res){
  co(function*(){
    var args= { sid : Number(req.params.sid)};
    var user = yield model.findDoc(args,db.collection('users'));
    var valid = true;
    if(user.projects){
      for(var i in projects){
        if(projects[i].name == req.body.name)
          valid =false;
      }
    }
    if(valid){
      req.body.creator ={sid :Number(req.params.sid) , name : user[0].name};
      var insert =yield model.insertDoc(req.body, db.collection('projects'),'project_id');
      if(insert.sid){
        var where = { sid : Number(req.params.sid)};
        var modify = { $push :{ projects : {  sid: Number(insert.sid) , name : req.body.name} }};
        var update_user = yield model.partialUpdate(where, modify, db.collection('users'));
        if(update_user.nModified ===1)
          res.status(200).send('OK');
        else res.staus(400).send();
      }else res.status(400).send();
    }else res.status(409).send('Duplicate Error');
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};

//프로젝트 삭제
exports.project_delete =function(req,res){
  co(function*(){

    var user_modify = { $pull : { projects : {sid :Number(req.params.rid)} }};
    var repo_args = { sid : Number(req.params.rid)};
    var user_result= yield model.partialUpdate({},user_modify,db.collection('users'));
    var repo_result = yield model.deleteDoc(repo_args,db.collection('projects'));

    if(user_result.nModified ===1 && repo_result.n===1)
      res.status(200).send();
    else
      res.status(400).send();

  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};

//프로젝트 리스트
exports.project_list =function(req,res){
  co(function*(){
    var args = { $or : [{ 'creator.sid': Number(req.params.sid)} , { 'members.sid' :Number(req.params.sid)} ] };
    var result = yield model.list(1,20,args, db.collection('projects'));
    if(result){
      res.status(200).send(result);
    }else res.status(400).send();
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};

//프로젝트 상세보기
exports.project_view = function(req,res){
  co(function*(){
    var args = { sid :Number(req.params.rid)};
    var result = yield model.findOneDoc(args, db.collection('projects'));
    if(result){
      res.status(200).send(result);
    }else res.status(400).send();
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};


//카테고리 생성
exports.category_new = function(req,res){
  co(function*(){
    var args = { sid :Number(req.params.rid)};
    var modify = { $addToSet : { category : {name :req.body.name, done : 0 , total :0 } } };
    var result = yield model.partialUpdate(args,modify, db.collection('projects'));
    if(result.nModified ===1){
      res.status(200).send('OK');
    }else
      res.status(400).send();
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};
