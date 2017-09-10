const router = require('express').Router()
const handleError = require('../index').handleError
const EventModel = require('../models/events').model
	
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
				res.status(200).json({docs})
		})
	})

	router.post('/', (req, res)=>{
		const event = req.body.event
		if(event){
			const newEvent = new EventModel(req.body.event);
			newEvent.save()
			res.status(200).json(newEvent)
		}else{
			handleError(res, {}, "You need to send an event object!")
		}
	})

	router.put('/', (req, res)=>{
		const { event } = req.body
		console.log(event)
		if(event){
			const { _id } = event
			if(_id){
				delete event._id
				EventModel.update({ _id }, event, (err, result)=>{
					if(err){
						handleError(res, err, "Updating the event didn't work!")
					}else{
						res.status(200).json({ ok:1 })
					}
				} )
			}else{
				res.status(400).json({ error:{ message:"No valid event id given."}})
			}
		}else{
			res.status(400).json({error:"Huh", body:req.body})
		}

	})

	router.delete('/:id', (req, res)=>{
		const { id } = req.params
		console.log(handleError);
		
		EventModel.deleteOne({_id:id}, (err, result)=>{
				if(err){
					handleError(res, err, "Something went wrong deleting that.")
				}else{
					res.status(200).json({result})
				}
			})
	})
module.exports = router

