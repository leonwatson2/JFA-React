// import data from '../../data/events.json';
import { createPromiseActionsFor, getUserToken } from './utils';

const addEventActionTypes = createPromiseActionsFor("ADD_EVENT")
const getEventActionTypes = createPromiseActionsFor("GET_EVENTS")
const updateEventActionTypes = createPromiseActionsFor("UPDATE_EVENT")
const deleteEventActionTypes = createPromiseActionsFor("DELETE_EVENT")

export const eventActionTypes = {
	...addEventActionTypes,
	...getEventActionTypes,
	...updateEventActionTypes,
	...deleteEventActionTypes,
	CREATE_EVENT:"CREATE_EVENT",
	CANCEL_CREATE_EVENT:"CANCEL_CREATE_EVENT"
}


export const getEvents = ()=>{
	return {
		type:eventActionTypes.GET_EVENTS
	}
}

export const addEvent = (event)=>{

	const headers = new Headers({
		"Authorization": `Bearer ${getUserToken()}`,
		"Content-type":"application/json"
	})

	return dispatch => { 
			const body = JSON.stringify({event})
			dispatch({
				type:eventActionTypes.ADD_EVENT,
				payload: fetch("/api/events", { headers, method:"POST", body})
						.then(res => {
							return res.json()
						}).then(data => {
							if(data.error)
								throw data.error
							return data
						})
			}).catch(err => {
				if(err === "Invalid Token"){
					
				}
			})
		}
}
export const deleteEvent = event => ({
		type: eventActionTypes.DELETE_EVENT,
		payload: event
	})
export const updateEvent = event =>({
		type:eventActionTypes.UPDATE_EVENT,
		payload:event
})

export const createEvent = ()=>({
	type:eventActionTypes.CREATE_EVENT
})

export const cancelCreateEvent = ()=>({
	type:eventActionTypes.CANCEL_CREATE_EVENT
})
