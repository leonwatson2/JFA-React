const router = require('express').Router()
const handleError = require('../index').handleError
const EventModel = require('../models/events').model
const jwt = require('jsonwebtoken')
const config = require('../../../config.js')
const responses = require('./utils.js').responses

/* /api/events
* GET: get all the events
* /api/events/:id get event by id
* POST: add an event to the database
* PUT: update an event in the database
* DELETE: delete an event from the database
* /api/events/:id delete events with ids
*/

router.get('/', (req, res)=>{
	EventModel.find({}).exec((err, docs)=>{
			res.status(responses.OK).json({docs})
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
			EventModel.update({ _id }, event, (err, result)=>{
				if(err){
					handleError(res, err, "Updating the event didn't work!", responses.SERVER_ERROR)
				}else{
					res.sendStatus(204)
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
	console.log(handleError);
	
	EventModel.deleteOne({_id:id}, (err, result)=>{
			if(err){
				handleError(res, err, "Something went wrong deleting that.")
			}else{
				res.sendStatus(responses.NO_CONTENT)
			}
		})
})
module.exports = router

function validToken(req, res, next){
	if(("authorization" in req.headers)){
		const token = req.headers["authorization"].split(" ")[1]
		req.token = token
		jwt.verify(token, config.dbsecret, (err, data)=>{
			if(err)
				handleError(res, "Invalid Token", "Invalid Token", responses.FORBIDDEN)
			next()
		})
	}else {
		handleError(res, "No Auth token supplied.", "No Auth token supplied. i.e. Bearer {token}", responses.BAD_REQUEST)
	}
}
