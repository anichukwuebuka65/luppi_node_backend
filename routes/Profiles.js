const express = require('express')
const Comments = require('../models/CommentsModel')
const Friends = require('../models/FriendsModel')
const Likes = require('../models/LikesModel')
const Post = require('../models/PostModel')
const Shares = require('../models/SharesModel')
const  User  = require('../models/UserModel')
const { Profile } = require('../models/ProfileModel')
const { fetchPost } = require('./Posts')
const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const id = req.query.id
         const profile = await Profile.findOne({
             where: {
                 userId: id
             },
         })
         const friendsCount = await Friends.count({
             where: {
                 userId: id
             },
         })
         const userPosts = await fetchPost([id])
         const result = {
            profile,
            friendsCount,
            userPosts
         }
         res.status(200).json(result)
    } catch (error) {
        res.send(error.message)
    }
 })


module.exports = router