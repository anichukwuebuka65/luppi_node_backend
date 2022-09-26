const express = require('express')
const Comments = require('../models/CommentsModel')
const Friends = require('../models/FriendsModel')
const Likes = require('../models/LikesModel')
const Post = require('../models/PostModel')
const Shares = require('../models/SharesModel')
const  User  = require('../models/UserModel')
const { Profile } = require('../models/ProfileModel')
const { fetchPost } = require('./Posts')
const { Op } = require('sequelize')
const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const id = parseInt(req.query.id)
         const profile = await Profile.findOne({
             where: {
                 userId: id,
             },
             include: {
                model: User,
                attributes: ["firstName","lastName"]
             }
         })
         
         const friendsCount = await Friends.count({
             where: {
                [Op.and]:{
                    userId: id,
                    status:"accepted"

                }
             },
         })
         const userPosts = await fetchPost([id])
         const result = {
            profile,
            friendsCount:friendsCount ?? 0,
            userPosts:userPosts ?? []
         }
         res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
 })

 router.post("/", (req, res)=>{
    console.log(req.body)
        Profile.update({
            profilepicture: req.body.url
        },{
            where:{
                userId: req.body.userId
            }
        })
        .then(()=> res.status(200).end("success"))
        .catch((err) => res.status(500).end(err))
 })


module.exports = router