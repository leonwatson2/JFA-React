
let express = require("express");
let router = require("express").Router();
let bodyParser = require("body-parser");
let mongoose = require("mongoose")
let app = express()
let port = process.env.PORT || 3001
app.use(bodyParser.json());

module.exports.handleError = function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}

mongoose.connect("mongodb://localhost:27017/jfa_test")

router.use('/members', require('./routes/members'))
router.use('/events', require('./routes/events'))
app.get('/', (req, res)=>{
	res.status(200).json({status:"online"})
})
app.use('/api',router)


app.listen(port, ()=>{
		console.log("Port:", port)
})



