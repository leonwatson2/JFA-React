// import data from '../../data/events.json';
import { createPromiseActionsFor } from './utils';

const addEventActionTypes = createPromiseActionsFor("ADD_EVENT")
const getEventActionTypes = createPromiseActionsFor("GET_EVENTS")
const updateEventActionTypes = createPromiseActionsFor("UPDATE_EVENT")

export const eventActionTypes = {
	...addEventActionTypes,
	...getEventActionTypes,
	...updateEventActionTypes,
}

export const getEvents = ()=>{
	return {
		type:eventActionTypes.GET_EVENTS,
		payload:fetch("/api/events", { method:"GET" }).then(res => res.json())
	}
}

export const addEvent = (event)=>({
	type:eventActionTypes.ADD_EVENT,
	payload: fetch("/api/events", { method:"POST" }).then(res => res.json())
	
})
const headers = {
                "Content-Type": "application/json"
            }
export const updateEvent = (newEvent)=>({
	type:eventActionTypes.UPDATE_EVENT,
	payload: fetch("/api/events", { headers:headers, method:"PUT", body:JSON.stringify({event:newEvent}) }).then(res => res.json())
})
