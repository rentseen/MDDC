var express = require('express');
var router = express.Router();

//mongodb init
var MongoClient = require('mongodb').MongoClient
	,assert = require('assert');
var url = 'mongodb://localhost:10001/MDDC';
var dbClient;
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to db server");
	dbClient=db;
});



/* GET users listing. */
router.post('/join', function(req, res, next) {
	var user = dbClient.collection('user');
	user.find({name:req.body.name}).toArray(function(err,result){
		assert.equal(err, null);
		var respond=new Object();
		if(result.length==0){
			user.insertOne(req.body,function(err,result){
				assert.equal(err, null);
				respond.status="success";
				respond.auth=result.ops[0]._id;
				res.send(respond);
			});
		}
		else{
			respond.status="error";
			respond.error="用户名已存在";
			res.send(respond);
		}
		
	});
	

});

router.post('/login', function(req, res, next) {
	var user = dbClient.collection('user');
	user.find({name:req.body.name, password: req.body.password}).toArray(function(err,result){
		assert.equal(err, null);
		console.log(result);
		var respond=new Object();
		if(result.length>0){
			respond.status="success";
			respond.auth=result[0]._id;
			res.send(respond);
		}
		else{
			respond.status="error";
			respond.error="用户名或密码错误";
			res.send(respond);
		}
		
	});
});

module.exports = router;
