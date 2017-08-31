import data from '../../data/events.json';
import { createPromiseActionsFor } from './utils';

const addEventActionTypes = createPromiseActionsFor("ADD_EVENT")
const getEventActionTypes = createPromiseActionsFor("GET_EVENTS")

export const eventActionTypes = {
	...addEventActionTypes,
	...getEventActionTypes,
	EDIT_EVENT:"EDIT_EVENT"
}

export const getEvents = ()=>{
	return {
		type:eventActionTypes.GET_EVENTS,
		payload: new Promise((resolve, reject)=>{
			setTimeout(()=>{
				resolve(data.events)
			}, 1500)
		})
	}
}

export const addEvent = (event)=>({
	type:eventActionTypes.ADD_EVENT,
	payload: new Promise((resolve, reject)=>{
		setTimeout(()=>{
			resolve(event)
		}, 500)
	})
})

export const editEvent = (isEditing)=>({
	type:eventActionTypes.EDIT_EVENT,
	payload: isEditing
})
