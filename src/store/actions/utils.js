export const createPromiseActionsFor = (ACTION) => {
	return {
		[ACTION]:ACTION, 
		[`${ACTION}_PENDING`]:`${ACTION}_PENDING`,
		[`${ACTION}_FULFILLED`]:`${ACTION}_FULFILLED`,
		[`${ACTION}_REJECTED`]:`${ACTION}_REJECTED`
	}
}
export const apiEndpoint = '/api'