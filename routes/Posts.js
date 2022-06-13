const express = require('express')
const router = express.Router()
const {Post} = require('../models/PostModel')

router.get('/', async(req, res) => {
    try {
        const post = await Post.create({
            postName: req.body.postname,
            userId: '3' 
        });
       res.json(post)
    }catch(err){
        res.send(`error:${err.message}`)
    }
   
   
})

module.exports = router