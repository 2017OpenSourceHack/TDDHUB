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
      var today= new Date();
      req.body.created = today;
      req.body.lastUpdated = today;
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

    var user_modify = { $pull : { projects : {sid :Number(req.params.pid)} }};
    var repo_args = { sid : Number(req.params.pid)};
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
    var args = { sid :Number(req.params.pid)};
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
    var category = {project_sid : Number(req.params.pid), name :req.body.name, testcases:[] , done : 0, total :0, test_seq:0};
    var result = yield model.insertDoc(category, db.collection('categories'),'category_id');
    if(result.n ===1){
      res.status(200).send('OK');
    }else
      res.status(400).send();
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};

//카테고리 삭제
exports.category_delete = function(req,res){
  co(function*(){
    var args = { $and :[{sid :Number(req.params.cid)}, {project_sid: Number(req.params.pid)}]};
    var result = yield model.deleteDoc(args, db.collection('categories'));
    if(result.n ===1){
      res.status(200).send('OK');
    }else
      res.status(400).send();
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};


//테스트케이스 생성, 수정
exports.testcase_new = function(req,res){
  co(function*(){
    var args = { $and :[{sid :Number(req.params.cid)}, {project_sid: Number(req.params.pid)}]};
    var category = yield model.findOneDoc(args, db.collection('categories'));
    if(category){
      if(!req.body.sid){ //새로생성
      req.body.sid = category.test_seq +1;
      req.body.success= [];
      category.total +=1;
      category.test_seq +=1;
      category.testcases.push(req.body);
      }
      else {
       //수정
      for(var i in category.testcases){
        if(category.testcases[i].sid === Number(req.body.sid))
        {
          category.testcases[i]= req.body;
          break;
        }
      }

    }
      var result = yield model.updateDoc(args,category, db.collection('categories'));
      if(result.nModified ===1){
        res.status(200).send('OK');
      }else
      res.status(400).send();
    }else res.status(400).send();
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });

};


//테스트케이스 삭제
exports.testcase_delete =function(req,res){
  co(function*(){
    var args = { $and :[{sid :Number(req.params.cid)}, {project_sid: Number(req.params.pid)}]};
    var modify = { $pull : {testcases : {sid : Number(req.params.tid)}} };
    var result = yield model.partialUpdate(args,modify, db.collection('categories'));
    if(result.nModified ===1){
      res.status(200).send('OK');
    }else
      res.status(400).send();
  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};


//테스트케이스 완료 / 미완료
exports.testcase_done=function(req,res){
  co(function*(){
    var args = { $and :[{sid :Number(req.params.cid)}, {project_sid: Number(req.params.pid)}]};
    var category = yield model.findOneDoc(args, db.collection('categories'));

    if(category){
      for(var i in category.testcases){
        if(category.testcases[i].sid === Number(req.params.tid)){
          var flag= false;
          for(var j in category.testcases[i].success){
            if(category.testcases[i].success[j]===Number(req.params.sid)) {//이미완료를 누른 경우
                category.testcases[i].success.splice(j,1);

                flag=true;
            }
          }
          if(!flag){
            category.testcases[i].success.push(Number(req.params.sid));
          }
          // if(category.testcases[i].success.length ===category.testcases[i].members.length){
          //   category.testcases[i].okflag=true;
          // }else false;
          break;
        }
      }
    var result = yield model.updateDoc(args,category, db.collection('categories'));
    if(result.nModified ===1){
      res.status(200).send('OK');
    }else
    res.status(400).send();
  }else res.status(400).send();

  }).catch(function(err){
    console.log(err);
    res.status(500).send(err);
  });
};




// 승인(링크처리).
