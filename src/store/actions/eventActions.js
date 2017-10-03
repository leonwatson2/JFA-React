// import data from '../../data/events.json';
import { createPromiseActionsFor } from './utils';

const addEventActionTypes = createPromiseActionsFor("ADD_EVENT")
const getEventActionTypes = createPromiseActionsFor("GET_EVENTS")
const updateEventActionTypes = createPromiseActionsFor("UPDATE_EVENT")

export const eventActionTypes = {
	...addEventActionTypes,
	...getEventActionTypes,
	...updateEventActionTypes,
	CREATE_EVENT:"CREATE_EVENT",
	CANCEL_CREATE_EVENT:"CANCEL_CREATE_EVENT"
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
export const deleteEvent = (event)=>({
	type:eventActionTypes.DELETE_EVENT,
	payload: fetch(`/api/events/${event._id}`, {method:"DELETE"})
			.then(res=>{
				if(res.status === 204)
					return {status:"ok"}
				else{
					return {error:"Something went wron when deleting. Try Again Later"}
				}
			})
})
const headers = {
                "Content-Type": "application/json"
            }
export const updateEvent = (newEvent)=>{
	const init = { 
		headers:headers, 
		method:"PUT", 
		body:JSON.stringify({event:newEvent}) 
	}
	return {
		type:eventActionTypes.UPDATE_EVENT,
		payload: fetch("/api/events", init)
					.then(res => {
						return res.json()
					})
					.then(event=>event)
					.catch(err=>{
					})
	}
}

export const createEvent = ()=>({
	type:eventActionTypes.CREATE_EVENT
})

export const cancelCreateEvent = ()=>({
	type:eventActionTypes.CANCEL_CREATE_EVENT
})