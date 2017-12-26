const router = require('express').Router()
const handleError = require('../index').handleError
const EventModel = require('../models/events').model
const jwt = require('jsonwebtoken')
const config = require('../../../config.js')
const { responses, hasParams } = require('./utils.js')
const MemberModel = require('../models/members').model
const AWS = require('aws-sdk')
const multipartMiddleware = require('connect-multiparty')()
const fs = require('fs')
const bucketName = "unt-jfa"
AWS.config.loadFromPath(__dirname +'/aws.config.json')
const uploadToAwsBucketEvent = require('../utils/awsUpload')(bucketName, new AWS.S3())

/* /api/events
* GET: get all the events
* /api/events/:id get event by id
* POST: add an event to the database
* /api/event/:eventId/members/:memberId adds memberId to checkins of event
* PUT: update an event in the database
* DELETE: delete an event from the database
* /api/events/:id delete events with ids
*/

router.get('/', (req, res)=>{
	EventModel.find({}).exec((err, docs)=>{
		if(err)
			handleError(res, err, "Database error.", responses.SERVER_ERROR)
		else
			res.status(responses.OK).json(docs)
	})
})

//Event, EventPhoto, 
router.post('/image/upload', multipartMiddleware, (req, res)=>{
	
	let filePath = req.files.file.path
	const image = fs.createReadStream(filePath)

	const imageName = camelCase(`event${new Date().toUTCString()}`)
	uploadToAwsBucketEvent(imageName, image, function uploadCallback(err, result){
		if(err) {
			if(err.code === "RequestTimeout"){
				console.log(err)
				uploadToAwsBucketEvent(imageName, image, uploadCallback)
			}else{
				return res.status(500).json({ err })
			}
		}else{
			res.status(200).json({ imageUrl:`https://s3.amazonaws.com/${bucketName}/${imageName}`})
		}
	})
})  



router.post('/:eventId/members/:memberId', hasParams(['memberId', 'eventId']), (req, res)=>{
	const { memberId, eventId } = req.params
	EventModel.count({ _id: eventId } , (err, count)=>{
	  
	  if(err){
			handleError(res, "DB error", err.message, responses.BAD_REQUEST)
	  }else if(count <= 0){
			handleError(res, "Event not found.", "Event not found", responses.BAD_REQUEST)
	  }else{
		
		MemberModel.findOne({_id:memberId}, (err, member)=>{
		  if(err){
				handleError(res, "DB error", err.message, responses.BAD_REQUEST)
		  }else{
				EventModel.addCheckIn(eventId, memberId, (err, result)=>{
					res.status(responses.OK).json({count, member})
				})
		  }
		})
	  } 
	})
})
  
router.post('/', validToken, (req, res)=>{
	const { event } = req.body
	if(event){
		const newEvent = new EventModel(req.body.event);
		newEvent.save()
		res.status(responses.CREATED).json(newEvent)
	}else{
		handleError(res, {}, "No event sent!", responses.BAD_REQUEST)
	}
})

router.put('/', (req, res)=>{
	const { event } = req.body
	if(event){
		const { _id } = event
		if(_id){
			delete event._id
			EventModel.findOneAndUpdate({ _id }, event, {new:true}, (err, result)=>{
				if(err){
					handleError(res, err, "Updating the event didn't work!", responses.SERVER_ERROR)
				}else{
					res.status(responses.OK).json(result)
				}
			} )
		}else{
			res.status(responses.BAD_REQUEST).json({ error:{ message:"No valid event id given."}})
		}
	}else{
		res.status(responses.BAD_REQUEST).json({error:"Huh", body:req.body})
	}

})

router.delete('/:id', (req, res)=>{
	const { id } = req.params
	if(id){

		EventModel.deleteOne({_id:id}, (err, result)=>{
			if(err){
				handleError(res, err, "Something went wrong deleting that.")
			}else{
				res.sendStatus(responses.NO_CONTENT)
			}
		})
	}	else {
		res.status(responses.BAD_REQUEST).json({ error: "No id given" })
	}
})
module.exports = router

function validToken(req, res, next){
	if(("authorization" in req.headers)){
		const token = req.headers["authorization"].split(" ")[1]
		req.token = token
		jwt.verify(token, config.dbsecret, (err, data)=>{
			if(err){
				handleError(res, "Invalid Token", "Invalid Token", responses.FORBIDDEN)
			}else{
				next()
			}
		})
	}else {
		handleError(res, "No Auth token supplied.", "No Auth token supplied. i.e. Bearer {token}", responses.BAD_REQUEST)
	}
}
/**
 * 
 * @param {string} string to camel cased
 */
function camelCase(string){
	return string.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
		}).replace(/(\s+|,)/g, '');
}