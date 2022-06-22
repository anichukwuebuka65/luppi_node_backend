const express = require('express')
const router = express.Router()
const Post = require('../models/PostModel')

router.post('/', async(req, res) => {
    try {
        const post = await Post.create({
            postName: req.body.postname,
            userId: req.body.user 
        });
        res.status(200).json(post)
    }catch(err){
        res.send(`error:${err.message}`)
    }
})

module.exports = router