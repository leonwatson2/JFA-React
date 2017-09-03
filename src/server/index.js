
let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb")
let app = express()

app.use(bodyParser.json());
let eventRoutes = require('./events')
let db


module.exports.handleError = function handleError(res, reason, message, code) {
	  console.log("ERROR: " + reason);
	  res.status(code || 500).json({"error": message});
	}
mongodb.MongoClient.connect("mongodb://localhost:27017/jfa", (err, database)=>{

	if(err){
		console.log(err)
		process.exit(0)
	}

	db = database
	console.log("Connected to DB");

	let server = app.listen(3001, ()=>{
		
		console.log("Port:", server.address().port)
		eventRoutes(app, db)
	})
	


})

