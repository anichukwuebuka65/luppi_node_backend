const express = require('express')
const router = express.Router()
const Post = require('../models/PostModel')
const Friends = require('../models/FriendsModel')

router.post('/', async(req, res) => {
    try {
        const post = await Post.create({
            post: req.body.postname,
            userId: req.body.user 
        });
        res.status(200).json(post)
    }catch(err){
        res.send(`error:${err.message}`)
    }
})

router.get('/', async(req,res)=>{
 console.log(req.query.userId)
    try {
        const friendsId = await Friends.findAll({where: {userId:req.query.userId}, attributes: ['friendUserId']})
        const ids = []
        friendsId.map((id) => ids.push(id.friendUserId))
        console.log(ids)
        const posts = await Post.findAll({where: {userId: ids}, attributes:['id','post']})
        //if(posts.length == 0) return res.send(['no posts found'])
        res.status(200).send(posts)
        console.log(posts)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
module.exports = router