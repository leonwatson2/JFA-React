import { eventActionTypes as A } from './actions/eventActions'
export const initialState = { 
							events:[], 
							fetching:false, 
							savingEvent:false 
							}


export const eventsReducer = (state = initialState, action) => {
	
	if(action)
	switch(action.type){
		case A.GET_EVENTS_PENDING:
			return { 
					...state, 
					fetching:true
					}
		case A.GET_EVENTS_FULFILLED:
			return { 
					...state, 
					events:action.payload,
					fetching:false
					}
		case A.GET_EVENTS_REJECTED:
			return { 
					...state, 
					fetching:false
					}
		case A.ADD_EVENT_PENDING:
			return { 
					...state, 
					savingEvent:true
					}
		case A.ADD_EVENT_FULFILLED:
			return { 
					...state, 
					events:action.payload,
					savingEvent:false

					}
		case A.ADD_EVENT_REJECTED:
			return { 
					...state, 
					savingEvent:false
					}
		case A.UPDATE_EVENT_PENDING:
			return { 
					...state, 
					savingEvent:true
					}
		case A.UPDATE_EVENT_FULFILLED:
			let events = state.events.map((e)=>{
				if(e._id === action.payload._id){
					return action.payload
				}
				return e
			})
			return { 
					...state, 
					events,
					savingEvent:false
					}
		case A.UPDATE_EVENT_REJECTED:
			return { 
					...state, 
					savingEvent:false
					}
		default: 
	}
	return state
}