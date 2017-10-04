let mongoose = require("mongoose")

const eventSchema = mongoose.Schema({ 
  type: String,
  name: String,
  description: String,
  location: String,
  startTime: Date, //i.e '2016-08-29 19:00:00',
  endTime: Date, //i.e '2016-08-29 21:00:00',
  checkIns: [String],
  id: Number,
  creator: String,
  date_created: Date, //'2016-09-11 22:32:24',
  image_url: String 
}, { versionKey:false, timestamps:{ createdAt:"date_created" } })


eventSchema.statics.addCheckIn = function(eventId, checkInId, cb){
  
  return this.findOneAndUpdate( {_id:eventId}, { $push: { checkIns:checkInId } }, cb)

}

const EventModel = mongoose.model('events', eventSchema)

module.exports = {
  model:EventModel
}