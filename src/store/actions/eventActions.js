// import data from '../../data/events.json';
import { createPromiseActionsFor, getUserToken } from "./utils";

const addEventActionTypes = createPromiseActionsFor("ADD_EVENT");
const getEventActionTypes = createPromiseActionsFor("GET_EVENTS");
const updateEventActionTypes = createPromiseActionsFor("UPDATE_EVENT");
const deleteEventActionTypes = createPromiseActionsFor("DELETE_EVENT");

export const eventActionTypes = {
  ...addEventActionTypes,
  ...getEventActionTypes,
  ...updateEventActionTypes,
  ...deleteEventActionTypes,
  CREATE_EVENT: "CREATE_EVENT",
  CANCEL_CREATE_EVENT: "CANCEL_CREATE_EVENT"
};

export const getEvents = () => ({
  type: eventActionTypes.GET_EVENTS
});

export const addEvent = event => ({
  type: eventActionTypes.ADD_EVENT,
  payload: event
});
export const deleteEvent = event => ({
  type: eventActionTypes.DELETE_EVENT,
  payload: event
});
export const updateEvent = event => ({
  type: eventActionTypes.UPDATE_EVENT,
  payload: event
});

export const createEvent = () => ({
  type: eventActionTypes.CREATE_EVENT
});

export const cancelCreateEvent = () => ({
  type: eventActionTypes.CANCEL_CREATE_EVENT
});
