import { applyMiddleware, createStore, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import { eventsReducer } from './eventsReducer'
import { usersReducer } from './usersReducer'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import { authenticateUser } from './actions/userActions'

const reducers = combineReducers({
	user:usersReducer,
	events:eventsReducer
})

const middleware = applyMiddleware(promise(), thunk, createLogger())

export const store = createStore(reducers, {}, middleware)

store.subscribe(()=>{
	console.log("Change:", store.getState());
})


// store.dispatch(authenticateUser("mike", "password"))
store.dispatch({type:"AUTH_USER_PENDING"})



