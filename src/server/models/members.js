let mongoose = require("mongoose")
const EventModel = require("./events").Model

const memberSchema = mongoose.Schema({
    "name": String,
    "email": {
        type: String,
        validate:{
            isAsync: true,
            validator: function(email, callback){
                memberModel.find({email: email}, (err, doc)=>{
                    callback(doc.length === 0)
                    
                })
            },
            message:"Email already in use.",
            required: true
        }
    },
    "studentId": { type: String, default:"" },
    "hasPaid": { type: Boolean, default: false },
    "shirtSize": { type: String, default:"" },
    "dateJoined": { type: Date, default: Date.now },
    "numberOfCheckins": { type: Number, default: 0 },
    "lastCheckIn": Date
}, { versionKey: false })

memberSchema.methods.updateEmail = function (newEmail){
    this.email = newEmail
}

memberSchema.methods.checkInToEvent = function (eventId){
    return EventModel.addCheckIn(eventId, this._id, (err, result)=>{
        console.log(err)
    })
}
const memberModel = mongoose.model('members', memberSchema)

module.exports = {
    model : memberModel
}