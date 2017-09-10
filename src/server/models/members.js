let mongoose = require("mongoose")
const EventModel = require("./events").Model

const memberSchema = mongoose.Schema({
    "name": String,
    "email": String,
    "studentId": String,
    "hasPaid": { type:Boolean, default:false },
    "shirtSize": String,
    "dateJoined": { type:Date, default:Date.now },
    "numberOfCheckins": Number,
    "lastCheckIn": Date
}, { versionKey:false })

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