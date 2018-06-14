export const createPromiseActionsFor = (ACTION) => {
	return {
		[ACTION]:ACTION, 
		[`${ACTION}_PENDING`]:`${ACTION}_PENDING`,
		[`${ACTION}_FULFILLED`]:`${ACTION}_FULFILLED`,
		[`${ACTION}_REJECTED`]:`${ACTION}_REJECTED`
	}
}
export const asyncOfAction = (action)=>{
	return {
		pending: `${action}_PENDING`,
		fulfilled: `${action}_FULFILLED`,
		rejected: `${action}_REJECTED`,
	}
}

export const apiEndpoint = '/api'

export const userStorageKey = 'jfa_user'
export const tokenStorageKey = '$$jfaToken'

export const getUserToken = () => {
	return JSON.parse(localStorage.getItem(tokenStorageKey))
}