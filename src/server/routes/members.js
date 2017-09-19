const router = require('express').Router()
const handleError = require('../index').handleError
const MemberModel = require('../models/members').model
const EventModel = require('../models/events').model
const { responses, hasParams, hasPropertiesInBody, hasQueries }= require('./utils.js')

/* 
/api/members
  * GET: get all the check ins with x'ed out email
    /api/members/:email
    Get member by email
  * POST: 
    /api/members/
      adds member to database
    /api/members/:memberId/:eventId
      adds the memberid to the event checkins
    /api/members/new/:eventId
      adds new member to database and to event members
  * PUT: updates a members value in the database
* DELETE: delete an member from the database
* /api/events/:id delete member with id
*/

router.get('/', (req, res) =>{
  MemberModel.find({},{ email:false }, (err, members)=>{
    res.status(responses.OK).json({members})
  })
})

router.get('/emails', (req, res) =>{
  MemberModel.find({}, (err, members)=>{
    res.status(responses.OK).json({members})
  })
})

router.get('/:email', hasParams(['email']) ,(req, res)=>{
  const { email } = req.params
  MemberModel.findOne({email}, { email: false }, (err, member)=>{
    if(err){
      handleError(res, "Database error", "Database error", responses.SERVER_ERROR)          
    }else{
      res.status(responses.OK).json({member})
    }      
  })
})


router.post('/', hasPropertiesInBody(['member']) ,(req, res)=>{
  let { member } = req.body
    new MemberModel(member).save((err, doc)=>{
      if(err){
        handleError(res, "Email in use.", err, responses.BAD_REQUEST)
      }else
          res.status(responses.ACCEPTED).json({doc})
    })
})

router.delete('/:_id', hasParams(['_id']), (req, res)=>{
  const { _id } = req.params
    MemberModel.deleteOne({ _id:_id }, (err, response)=>{
      
      if(err || response.result.n === 0){
        err ? handleError(res, err, "Something went wrong deleting that.", responses.BAD_REQUEST) : 
        handleError(res, "Not a member id.", "Nothing deleted", responses.NOT_FOUND)
      }else{
        res.sendStatus(responses.NO_CONTENT)
      }
    })
})


router.delete('/', hasQueries(['ids']), (req, res)=>{
  const { ids } = req.query
  console.log(ids)
  MemberModel.remove({_id: { $in: ids.split(',') } }, (err, result)=>{
    if(err){
      handleError(res, "DB: delete by ids.","Something went wrong with the database.", responses.SERVER_ERROR) 
    }else{
      res.status(responses.OK).json({result:result.result})
    }
  })
})


  module.exports = router