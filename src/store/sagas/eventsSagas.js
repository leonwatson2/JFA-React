import { call, take, put, fork } from "redux-saga/effects";
import { eventActionTypes as E } from "../actions/eventActions";
import { getUserToken } from "../actions/utils";

//PENDING, REJECTED, FULFILLED
const headers = {
  "Content-Type": "application/json"
};
const getEvents = () => {
  return fetch("/api/events", { method: "GET" }).then(res => res.json());
};
const addEvent = (event)=>{
    const headers = new Headers({
      "Authorization": `Bearer ${getUserToken()}`,
      "Content-type":"application/json"
    })
    const body = JSON.stringify({ event })
    return fetch("/api/events", { headers, method:"POST", body })
          .then(res => {
            return res.json()
          }).then(data => {
            if(data.error)
              throw data.error
            return data
          })
      }
const updateEvent = newEvent => {
  const init = {
    headers: headers,
    method: "PUT",
    body: JSON.stringify({ event: newEvent })
  };
  return fetch("/api/events", init)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      throw new Error("Bad request" + err);
    });
};
const deleteEvent = event =>
  fetch(`/api/events/${event._id}`, { method: "DELETE" }).then(res => {
    if (res.status === 204) return { status: "ok" };
    else {
      return { error: "Something went wrong when deleting. Try Again Later" };
    }
  });

const getEventFlow = function*() {
  while (true) {
    yield take(E.GET_EVENTS);
    yield put({ type: E.GET_EVENTS_PENDING });
    let response = yield call(getEvents);
    yield put({ type: E.GET_EVENTS_FULFILLED, payload: response });
  }
};

const addEventFlow = function*(){
  while (true) {
    const { payload } = yield take(E.ADD_EVENT)
    yield put({ type:E.ADD_EVENT_PENDING })
    console.log(payload)
    let response = yield call(addEvent,payload)
    yield put({ type:E.ADD_EVENT_FULFILLED, payload:response })
  }
}

const updateEventFlow = function*() {
  while (true) {
    const { payload } = yield take(E.UPDATE_EVENT);
    yield put({ type: E.UPDATE_EVENT_PENDING });
    try {
      const event = yield call(updateEvent, payload);
      console.log(event);
      yield put({ type: E.UPDATE_EVENT_FULFILLED, payload: event });
    } catch (e) {
      yield put({ type: E.UPDATE_EVENT_REJECTED });
    }
  }
};

const deleteEventFlow = function*(){
  while (true) {
    const { payload } = yield take(E.DELETE_EVENT)
    console.log(payload)
    yield put({ type: E.DELETE_EVENT_PENDING })
    const { err, status } = yield call(deleteEvent, payload)
    console.log(err, status)
    yield put({ type: E.DELETE_EVENT_FULFILLED, payload:payload._id })

  }
}

export const eventsSaga = function*() {
  yield fork(addEventFlow);
  yield fork(getEventFlow);
  yield fork(updateEventFlow);
  yield fork(deleteEventFlow)
};
