
let express = require("express");
let router = require("express").Router();
let bodyParser = require("body-parser");
let mongoose = require("mongoose")
let app = express()
let port = process.env.PORT || 3001
let config = require("../../config")

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

module.exports.handleError = function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}

mongoose.connect(config.dburi, {useMongoClient:true}).catch((err)=>{
	console.log('Database Connection Error');	
})

router.use('/members', require('./routes/members'))
router.use('/events', require('./routes/events'))
router.use('/users', require('./routes/users'))

app.get('/', (req, res)=>{
	res.status(200).json({status:"online"})
})
app.use('/api',router)


app.listen(port, ()=>{
		console.log("Port:", port)
})



