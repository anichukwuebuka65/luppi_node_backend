const express = require("express")
const { Op } = require("sequelize")
const Friends = require("../models/FriendsModel")
const { Profile } = require("../models/ProfileModel")
const User = require("../models/UserModel")
const router = express.Router()

router.get("/", async(req, res) => {
    const results = await Friends.findAll({
        where:{
            userId: req.body.userId
        },
        attributes:["friendId"]
    })
    const ids = results.map(result => result.friendId)
    const friends = await User.findAll({
        where:{
            id: ids
        },
        attributes:["id","firstName","lastName"],
        include: {
            model: Profile,
            attributes:["profilepicture"]
        }
    })
    res.status(200).json(friends)
    
})

module.exports = router