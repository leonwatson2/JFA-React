const mongoose = require('mongoose')
const MemberModel = require('../members').model

describe('Member Model Add Tests', ()=>{
    const fakemMember = {
        _id:new mongoose.Types.ObjectId(2323),
        name:"Mike",
        email:"jim@vlw2.com",
        dateJoined:new Date(Date.now()),
        hasPaid:false     
    }
	beforeAll(()=>{
		MemberModel.remove({}).exec()
		mongoose.connect("mongodb://localhost:27017/jfa_test")
	})
	afterEach(()=>{
		MemberModel.remove({}).exec()
	})
	afterAll((done)=>{
		mongoose.disconnect(done)
    })
    
    it('should add a member to the database', async ()=>{
        const newMember  = new MemberModel(fakemMember)
        await newMember.save()
        const members = await MemberModel.findOne({})
        expect(members._id).toEqual(fakemMember._id)
    })
    
})