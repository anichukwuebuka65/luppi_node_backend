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
        if (result) {
            const comment = await Comment.findOne({
                where: {
                    [Op.and]:{
                        postId: req.body.postId,
                        comment: req.body.comment,
                        userId: req.body.userId
                    } 
                },
                include: {
                    model: User,
                    attributes:["id"],
                    include:{
                        model: Profile,
                        attributes: ['profilepicture']
                    }
                }
            })
            res.status(200).json(comment)
        } 
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

router.get("/", async(req, res) => {
    try {
        const results = await Comment.findAll({
            where: {
                postId: req.body.postId
            },
            limit: 10,
            include: {
                model: User,
                attributes:["id"],
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