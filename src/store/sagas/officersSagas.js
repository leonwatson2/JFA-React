import { call, take, put, fork } from "redux-saga/effects";
import { apiEndpoint, asyncOfAction } from "../actions/utils";
import { officerActionsTypes as E } from "../officerReducer";

function loadOfficers(){

  return fetch(`${apiEndpoint}/users`).then(res=>res.json()).then(res=>res.users)
}

function* loadOfficersFlow() {
  const { payload } = yield take( E.LOAD_OFFICERS )
	yield put({ type: asyncOfAction(E.LOAD_OFFICERS).pending })
  const officers = yield call(loadOfficers)
  yield put({ type: asyncOfAction(E.LOAD_OFFICERS).fulfilled, payload: officers })
}

export function* officersSaga(){
  yield fork(loadOfficersFlow)
}