import { createPromiseActionsFor } from './utils';


export const userActionTypes = {
	...createPromiseActionsFor("AUTH_USER"),
}
const fakeUser = {
	name:"Leon Watson",
	username:"leon",
	password:"password",
	id:789456
}
export const authenticateUser = (username, password)=>({
	type:userActionTypes.AUTH_USER,
	payload:new Promise((resolve, reject)=>{
		setTimeout(()=>{
			if(fakeUser.username === username && fakeUser.password === password){
				resolve(fakeUser)
			}
			reject({error:"Email/password are not valid"})
		}, 2000)
	})
})