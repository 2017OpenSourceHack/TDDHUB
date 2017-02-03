var co = require('co');
var config = require('../config');
var mongoClient = require('mongodb').MongoClient;

var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");

var db;
var conllection;

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'sth2634@gmail.com',
      pass: 'slipknot2@'
    }
});

mongoClient.connect(config.connectionString, function (err, database) {
    if (err)
        console.log(err)
    else {
        db = database
    }
})



function getNextSequence(name) {
  return new Promise( function(resolve, reject) {
      co(function*() {
           var ret = yield db.collection('counters').findOneAndUpdate(
                    { _id: name },
                    { $inc: { seq: 1 } },
                    {new: true,upsert: true}
           );
           //console.log(ret);
          resolve(ret.value.seq);
        }).catch(function(err){
            reject(err);
         });
});
}
exports.findOneDoc = function(args, col){
    return new Promise(function(resolve, reject){
      co(function*(){
        var result= yield col.findOne(args);
        resolve(result);
      }).catch(function(err){
        reject(err);
      });
    });
};
exports.mailing = function(mailOptions){
  return new Promise(function(resolve,reject){
    co(function*(){
      var result= yield transporter.sendMail(mailOptions);
      resolve(result);
    }).catch(function(err){
        reject(err);
    });
  });

};

exports.partialUpdate = function(where,modify,col){
  return new Promise(function(resolve,reject){
    co(function*(){
      var result= yield col.update(where,modify,{ upsert:true, multi:true});
      resolve(result.result);
    }).catch(function(err){
        reject(err);
    });
  });

};

exports.findDoc = function (args ,col){
  return new Promise(function(resolve,reject){
    co(function*(){

      var docs = yield col.find(args).toArray();
      if(docs.length === 0){
        resolve(false);
      }
      else{
          resolve(docs);
      }
    }).catch(function(err){ reject(err);});
  });
}


exports.insertDoc = function (doc, col,sname){
  return new Promise(function (resolve,reject){
    co(function*(){
      doc.sid= yield getNextSequence(sname);
      var result = yield col.insert(doc);
      result.result.sid=doc.sid;
      // console.log(result);
      resolve(result.result);
    }).catch(function(err){
      reject(err);
    });
  });
}

exports.deleteDoc = function(args, col){
  return new Promise(function (resolve,reject){
    co(function*(){
    var result =yield col.deleteOne(args);
    resolve(result.result);
  }).catch(function(err){
    reject(err);
  });
});
}



exports.updateDoc = function(args, doc, col){
  return new Promise(function (resolve, reject){
    co(function*(){
      var result = yield col.update(args,doc);
      resolve(result.result);
    }).catch(function (err){
      reject(err);
    });
  });
};

exports.list = function(page, rows,args, col){
return new Promise(function (resolve, reject){
  co(function*(){
    var docs =  col.find(args);
    var result =yield docs.skip(rows * (page-1)).limit(rows).toArray();
    var count=result.length;
    //console.log(result);
    resolve({totalcount : count,  docs : result});
  }).catch(function(err){
    reject(err);
  });
});

};



exports.findOneDocAndReplace = function(args,modify,is_new_doc, col){
  return new Promise(function(resolve, reject){
    co(function*(){
      var result =yield col.findOneAndReplace(args,modify,{upsert : true, returnNewDocument : is_new_doc});
      resolve(result);
    })
    .catch(function(err){
      reject(err);
    });
  });

};
