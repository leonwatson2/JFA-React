import { userActionTypes as A } from './actions/userActions'
import { userStorageKey } from './actions/utils'
const initialState = () =>{
	let loggedIn = false, user = null
	if(localStorage.getItem(userStorageKey)){
		loggedIn = true
		user = JSON.parse(localStorage.getItem(userStorageKey))
	}
	return { loggedIn, authenticating:false, error:"", user }
}

export const usersReducer = (state = initialState(), action) => {
	switch(action.type){
		case A.AUTH_USER_PENDING:
			return {
				...state,
				authenticating:true,
				error: ""
			}
		case A.AUTH_USER_FULFILLED:
			return {
				...state,
				user:action.payload.user,
				authenticating:false,
				loggedIn:true
			}
		case A.AUTH_USER_REJECTED:
			return {
				...state,
				error:action.payload.error,
				authenticating:false
			}
		case A.LOGOUT:
			return {
				...state,
				loggedIn:false,
				user:null
			}
		default: 
	}
	return state
}