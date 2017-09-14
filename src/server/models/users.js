let mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    "name": String,
    "email": {
        type:String,
        validate:{
            isAsync:true,
            validator:function(email, callback){
                userModel.find({email:email}, (err, doc)=>{
                    callback(doc.length === 0)
                    
                })
            },
            message:"Email already in use."
        }
    },
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