const express = require('express')
const { User } = require('../models/UserModel')
const { UserProfile } = require('../models/UserModel')
const router = express.Router()

router.post('/',async(req, res)=>{
    try {
        const userId = await User.findOne({where:{email:req.body.email},attributes:['id']});
        const {id} = await UserProfile.create({
        profilepicture: req.body.profilepicture,
        age: req.body.age,
        gender: req.body.gender,
        country: req.body.country,
        userId: userId
        })
        res.json({id})
        
    } catch (error) {
        res.end(error.message)
    }
  
})

module.exports = router