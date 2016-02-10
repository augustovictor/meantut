var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res) {
	// Say that we want to use MongoClient server
	var MongoClient = mongodb.MongoClient;

	// Where mongodb is located
	var url = 'mongodb://localhost:27017/sampsite';

	// Connection
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to conect to the server', err);
		}
		else {
			console.log('Connection established to ', url);

			// Get data collection from db
			var collection = db.collection('students');

			collection.find({}).toArray(function(err, result) {
				if (err) {
					// Send to browser
					res.send(err);
				}

				else if(result.length) {
					res.render('studentlist', {
						'studentlist': result
					});
				}

				else {
					res.send('No documents found');
				}

				db.close();
			});
		}
	});
});



module.exports = router;
