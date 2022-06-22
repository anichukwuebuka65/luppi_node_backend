const express = require('express')
const router = express.Router()
const Friends = require('../models/FriendsModel')

router.post('/',(req, res) => {
    try {
        const addFriend = async() => {
           const UserAdded = await Friends.create({
            friendUserId : req.body.friendUserId,
            userId : req.body.user
            })
            return res.json(UserAdded)  
        }
       addFriend()
    } catch (error) {
        res.send("server error, try again")
    }
   
   
})

module.exports = router