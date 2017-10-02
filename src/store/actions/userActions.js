import { createPromiseActionsFor, apiEndpoint } from './utils';


export const userActionTypes = {
	...createPromiseActionsFor("AUTH_USER"),
	LOGOUT:"LOGOUT"
}
export const fakeUser = {
	name:"Leon Watson",
	email:"leon@vlw2.com",
	password:"password",
	id:789456
}
export const authenticateUser = (email, password)=>{
	const body = JSON.stringify({user:{email, password}})
	const headers = new Headers({
		"Content-type":"application/json"
	})
	const init = { 
		method:'POST', 
		body,
		headers
		}
	return {
		type:userActionTypes.AUTH_USER,
		payload:fetch(`${apiEndpoint}/users/login`, init)
				.then(response =>{
					if(response.status === 500)
						throw new Error("Uh oh something went wrong. Let someone know!")
					return response.json()		
				}).then(res=>{
					console.log(res)
					if(res.error)
						throw new Error( res.error)
					else return {user:res.user}
				}).catch(err =>{
					console.log(err)
					return Promise.reject({error:err.message})
				})
	}
}

export const logoutUser = () => ({
	type:userActionTypes.LOGOUT
})