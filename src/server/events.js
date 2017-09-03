const EVENTS_COLLECTION = "events"
module.exports = function(app, db){
	/* /api/events
	* GET: get all the events
	* POST: add an event to the database
	* PUT: update an event in the database
	* DELETE: delete an event from the database
	*/
	app.get('/api/events', (req, res)=>{
		db.collection(EVENTS_COLLECTION).find({}).toArray((err, docs)=>{
			console.log(docs[0]);
			res.status(200).json(docs)
		})
	})

	app.post('/api/events', (req, res)=>{
		// console.log(req.body);
	})

	app.put('/api/events', (req, res)=>{
		const { event } = req.body
		if(event){
			db.collection(EVENTS_COLLECTION).update({id:event.id}, {$set:event}, (err, docs)=>{
				if(err){
					handleError(res, err.message, "Couldn't update event.")
				}
			})
			db.collection(EVENTS_COLLECTION).find({}).toArray((err, docs)=>{
				
				res.status(200).json(docs)
			})
		}else{
			handleError(res, "No id provided.","Couldn't update event.")
		}
	})

	app.delete('/api/events', ()=>{

	})
}

// { 
// 	_id: 59a58d4fa8c727fece8770ad,
//   type: string,
//   name: string,
//   description: string,
//   location: string,
//   start_time: Date.format('YYYY-MM-DD HH:mm:ss') i.e '2016-08-29 19:00:00',
//   end_time: Date.format('YYYY-MM-DD HH:mm:ss') i.e '2016-08-29 21:00:00',
//   number_of_checkins: number,
//   id: number,
//   creator: string,
//   date_created: Date.format('YYYY-MM-DD HH:mm:ss') '2016-09-11 22:32:24',
//   image_url: string 
// }