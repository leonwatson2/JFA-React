let mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    "name": String,
    "email": String,
    "position":String,
    "password":String,
    isVerified:{ type:Boolean, default:false }
}, { versionKey:false })

userSchema.methods.updateEmail = function (newEmail){
    this.email = newEmail
}


const userModel = mongoose.model('officers', userSchema)

module.exports = {
    model : userModel
}