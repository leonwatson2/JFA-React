import { createPromiseActionsFor } from './utils';


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
export const authenticateUser = (email, password)=>({
		type:userActionTypes.AUTH_USER,
		payload: { email, password }
})

export const logoutUser = () => ({
	type:userActionTypes.LOGOUT
})