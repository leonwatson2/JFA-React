const mongoose = require('mongoose')
const EventModel = require('../events').model
const { dburi } = require('./test-config')
const fakeEvent = { 
	_id:new mongoose.Types.ObjectId(2323),
	type: "Flow Meeting",
	name: "Cool Event",
	description: "This is an event description",
	location: "Here's a location",
	start_time: new Date(Date.now() + 60 * 60 * 1000), //i.e '2016-08-29 19:00:00',
	end_time: new Date(Date.now() + 2 * 60 * 60 * 1000), //i.e '2016-08-29 21:00:00',
	checkIns: [23, 12, 99, 10],
	id: 23,
	creator: "Leon Watson",
	date_created: new Date(Date.now()), //'2016-09-11 22:32:24',
	image_url: "Fake_Image_url.png" 
}

describe('Event Model Empty Test', ()=>{

	beforeAll(()=>{
		EventModel.remove({}).exec()
		mongoose.connect(dburi)
	})
	afterEach(()=>{
		EventModel.remove({}).exec()
	})
	afterAll((done)=>{
		mongoose.disconnect(done)
	})
	it('should return an empty set of events', async ()=>{
		const res = await EventModel.find({}).exec()
		expect(res).toEqual([])
		expect(res.length).toEqual(0)
	})

	it('should not be equal to string array', async ()=>{
		const res = await EventModel.find({}).exec()
			expect(res).not.toEqual([""])
	})
	it('should not be equal to object array', async ()=>{
		const res = await EventModel.find({}).exec()
			expect(res).not.toEqual([{}])
	})

	
})

describe('Adding events to collection', ()=>{
	const newEventWithName = (name = "") => new EventModel({name})
	
	beforeAll(()=>{
		EventModel.remove({}).exec()
		mongoose.connect("mongodb://localhost:27017/jfa_test")
	})
	beforeEach(()=>{
		return newEventWithName("Man").save()
	})
	afterEach(()=>{
		EventModel.remove({}).exec()
	})

	afterAll((done)=>{
		mongoose.disconnect(done)
	})

	it('should save an event to the database successfully', ()=>{
		
		return newEventWithName().save()

	})

	it('should have two entries', async ()=>{
		await newEventWithName("Mike").save()
		const res = await EventModel.find({}).exec()
		expect(res.length).toEqual(2)
	})

	it('should save an event with a description like fake event', async ()=>{
		await new EventModel(fakeEvent).save()
		const event = await EventModel.findOne({description:fakeEvent.description}, 
													{ description:true, start_time:true, end_time:true })
		console.log(event);
															
		expect(event.description).toEqual(fakeEvent.description)
	})

})



describe('modifying events', ()=>{
	
	beforeAll(()=>{
		mongoose.connect("mongodb://localhost:27017/jfa_test")
		EventModel.remove({}).exec()
	})
	beforeEach(()=>{
		return new EventModel(fakeEvent).save()
	})
	afterEach(()=>{
		return EventModel.remove({}).exec()		

	})
	afterAll((done)=>{
		mongoose.disconnect(done)
	})

	it('should change the name of the event to blue', async ()=>{
		const update = await EventModel.update({_id:fakeEvent._id}, { $set:{ name:"blue" } }).exec()
		const changedEvent = await EventModel.findById(fakeEvent).exec()
		
		expect(changedEvent.name).toEqual("blue")
	})

	it('should add the checkin with the id of 2333', async ()=>{
		const update = await EventModel.addCheckIn(fakeEvent._id, 2333)
		
		const changedEvent = await EventModel.findById(fakeEvent).exec()

		expect(changedEvent.checkIns).toContain("2333")
	})

})

