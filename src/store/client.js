import { applyMiddleware, createStore, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import { eventsReducer } from './eventsReducer'
import { usersReducer } from './usersReducer'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas/index';

const reducers = combineReducers({
	users:usersReducer,
	events:eventsReducer
})
const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(promise(), thunk, createLogger(), sagaMiddleware)


export const store = createStore(reducers, {}, middleware)

sagaMiddleware.run(rootSaga)
store.subscribe(()=>{
	console.log("Change:", store.getState());
})

