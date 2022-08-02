const express = require('express')
const router = express.Router()
const Post = require('../models/PostModel')
const Friends = require('../models/FriendsModel')
const Image = require('../models/ImagesModel')
const User = require('../models/UserModel')
const { Op } = require('sequelize')

router.post('/', async(req, res) => {
    try {
        const post = await Post.create({
            post: req.body.post ? req.body.post : '',
            userId: req.body.user 
        });
        res.status(200).json(post)
    }catch(err){
        res.send(`error:${err.message}`)
    }
})

router.get('/', async(req, res) => {
    try {
        
      const posts = await fetchPost(req.query.userId)
        // const posts = await Post.findAll({where: {userId: ids}, attributes:['id','post','updatedAt']})
        // if(posts.length == 0) return res.send(['no posts found'])
        res.status(200).json(posts)
    }
     catch (error) {
        res.status(400).send(error.message)
    }
})

async function fetchIds(user, friends) {
    const result = await friends.findAll({ where: {userId: user},
         attributes: ['allfriendId'],  
    })
    return putIdsInArray(result, user)
}

 const putIdsInArray = (result, user, ) => {
    const ids = [user]
    result.map(data => ids.push(data.allfriendId))
    return ids
}

async function fetchPost(user) {
    const ids = await fetchIds(user, Friends)
    const posts = await Post.findAll({
        where: {
            userId: {
            [Op.in] : ids
            }
        },
        include: [{
            model: User,
            attributes: ['firstName','lastName']
        }, {
            model: Image,
            attributes: ['imageUrl']
        }]
    })
    return posts
    // console.log(ids)
    // const results = User.findAll({
    //     where: {
    //         id: {
    //             [Op.in]: ids
    //         }
    //     },
    //     attributes: ['id','firstName','lastName'],
    //     include: [{
    //         model: Post,
    //         include: {
    //             model: Image,
    //             attributes: ['imageUrl']
    //         }
    //     },{
    //         model: Image,
    //         attributes: ['imageUrl']
    //     }]
    // })
    // return results
  }

module.exports = {
    router,
    putIdsInArray
}