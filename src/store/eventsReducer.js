import { eventActionTypes as A } from './actions/eventActions'
export const initialState = { events:[], fetching:false, editing:false, editEvent:null }


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
					fetching:true
					}
		case A.ADD_EVENT_FULFILLED:
			return { 
					...state, 
					events:action.payload,
					fetching:false

					}
		case A.ADD_EVENT_REJECTED:
			return { 
					...state, 
					fetching:false
					}
		default: 
	}
	return state
}