const express = require('express')
const sequelize = require('sequelize')
const router = express.Router()
const Like = require('../models/LikesModel')

router.post("/", async(req, res) => {
    try {
        const result = await Like.increment({
            likes:1
        },{
            where:{
                postId: req.body.postId
            }
        })
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/", async(req, res) => {
    try {
        const count = await Like.findOne({
            where: {
                postId: req.body.postId
            },
        })

        res.status(200).json(count)
    } catch (error) {
        res.status(500).json("server error")
        console.log(error)
    }
})

module.exports = router