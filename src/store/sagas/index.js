import { eventsSaga } from "./eventsSagas";
import { fork } from "redux-saga/effects";
import { usersSaga } from "./usersSagas";
import { officersSaga } from './officersSagas'
export const rootSaga = function*( ){
  yield fork( eventsSaga )
  yield fork( usersSaga )
  yield fork( officersSaga )
}