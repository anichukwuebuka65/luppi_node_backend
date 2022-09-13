const express = require('express')
const router = express.Router()
const Comment = require('../models/CommentsModel')
const { Profile } = require('../models/ProfileModel')
const User = require('../models/UserModel')

router.post("/", async(req, res) => {
    
    try {
       const result = await Comment.create({
            comments: req.body.comment,
            postId: req.body.postId,
            userId: req.body.userId
        })
        res.status(200).json(result)
        
    } 
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/", async(req, res) => {
    try {
        const results = await Comment.findAll({
            where: {
                postId: parseInt(req.query.postId)
            },
            limit: 5,
            order:[["updatedAt", "DESC"]],
            offset: parseInt(req.query.offset),
            include: {
                model: User,
                attributes:["id","firstName","lastName"],
                include:{
                    model: Profile,
                    attributes: ['profilepicture']
                }
            }
        })
        const comments = results.map((result) => {
            const { id, comments, updatedAt, user} = result
            return {id,comments,updatedAt,user: user.user_profile}
        })

         res.status(200).json(comments)
    } catch (error) {
        res.status(500).json("server error")
        console.log(error)
    }
})


module.exports = router