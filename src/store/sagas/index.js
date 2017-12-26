import { eventsSaga } from "./eventsSagas";
import { fork } from "redux-saga/effects";

export const rootSaga = function*( ){
  yield fork( eventsSaga )
  
}