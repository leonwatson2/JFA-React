import { getEvents, addEvent } from './eventActions'

describe('event actions', ()=>{

	it('should create an action that has a type GET_EVENTS', ()=>{
		expect(getEvents()).toHaveProperty('type', 'GET_EVENTS')
	})
	it('should create an action that has a type ADD_EVENT', ()=>{
		expect(addEvent()).toHaveProperty('type', 'ADD_EVENT')
	})

})

describe('user actions', ()=>{

	// it('should create an action that has a type GET_EVENTS', ()=>{
	// 	expect(getEvents()).toHaveProperty('type', 'GET_EVENTS')
	// })
	// it('should create an action that has a type ADD_EVENT', ()=>{
	// 	expect(addEvent()).toHaveProperty('type', 'ADD_EVENT')
	// })

})

