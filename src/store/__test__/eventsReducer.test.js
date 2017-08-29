import { eventsReducer, initialState } from '../eventsReducer'

describe('Get Events', ()=>{

	it('should return the initial state of events', ()=>{
		expect(eventsReducer()).toEqual(initialState)
	})
	
	it('should not be the fakeState of events', ()=>{
		const fakeState = {}
		expect(eventsReducer()).not.toEqual(fakeState)
	})

})