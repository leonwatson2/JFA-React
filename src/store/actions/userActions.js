import { createPromiseActionsFor } from './utils';


export const userActionTypes = {
	...createPromiseActionsFor("AUTH_USER"),
}
export const fakeUser = {
	name:"Leon Watson",
	email:"leon@vlw2.com",
	password:"password",
	id:789456
}
export const authenticateUser = (email, password)=>({
	type:userActionTypes.AUTH_USER,
	payload:new Promise((resolve, reject)=>{
		setTimeout(()=>{
			if(fakeUser.email === email && fakeUser.password === password){
				resolve({user:fakeUser})
			}
			reject({error:"Email/password are not valid"})
		}, 2000)
	})
})