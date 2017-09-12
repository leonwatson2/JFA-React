const router = require('express').Router()
const handleError = require('../index').handleError
const MemberModel = require('../models/members').model
const EventModel = require('../models/events').model

/* /api/members
    * GET: get all the check ins with x'ed out email
     /api/members/:email
     Get member by email
    * POST: 
      /api/members/:memberId/:eventId
        adds the memberid to the event checkins
      /api/members/new/:eventId
        adds new member to databse and to event members
    * PUT: updates a members value in the database
	* DELETE: delete an member from the database
	* /api/events/:id delete member with id
  */
  
  router.get('/', (req, res) =>{
    res.status(200).json({ok:1})
  })

  module.exports = router