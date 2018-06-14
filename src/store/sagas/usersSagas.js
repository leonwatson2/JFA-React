import { call, take, takeEvery, put, fork } from "redux-saga/effects";
import { userActionTypes as E } from "../actions/userActions";
import { apiEndpoint, userStorageKey, tokenStorageKey } from "../actions/utils";

const authenticateUser = (user)=>{
	const body = JSON.stringify({ user })
	const headers = new Headers({
		"Content-type":"application/json"
	})
	const init = { 
		method:'POST', 
		body,
		headers
		}
		return fetch(`${ apiEndpoint }/users/login`, init)
				.then(response =>{
					if(response.status === 500)
						throw new Error("Uh oh something went wrong. Let someone know!")
					return response.json()		
				}).then(res=>{
					if(res.error)
						throw new Error(res.error)
					else {
						localStorage.setItem(userStorageKey, JSON.stringify(res.user))
						localStorage.setItem(tokenStorageKey, JSON.stringify(res.token))
						return { user:res.user }
					}
				}).catch(err =>{
					console.log(err)
					throw new Error({ error: err.message })
				})
}

function* loginFlow() {
  const { payload } = yield take(E.AUTH_USER)
	yield put({ type:E.AUTH_USER_PENDING })
	try{
		const response = yield call(authenticateUser, payload )
		yield put({ type:E.AUTH_USER_FULFILLED, payload:response })
	}catch(error){
		yield put({ type:E.AUTH_USER_REJECTED, payload: error })
		
	}
}
function* logoutFlow(){
  yield takeEvery(E.LOGOUT, function*(){
    yield localStorage.removeItem(userStorageKey)
		yield localStorage.removeItem(tokenStorageKey)
  })
}
export function* usersSaga(){
  yield fork(loginFlow)
  yield fork(logoutFlow)
}