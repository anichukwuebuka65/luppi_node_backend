const express = require('express')
const router = express.Router()
const Post = require('../models/PostModel')
const Friends = require('../models/FriendsModel')
const Image = require('../models/ImagesModel')
const User = require('../models/UserModel')
const { Op } = require('sequelize')
const Comments = require('../models/CommentsModel')
const Likes = require('../models/LikesModel')
const Shares = require('../models/SharesModel')

router.post('/', async(req, res) => {
    try {
        const {id} = await Post.create({
            post: req.body.post ? req.body.post : '',
            userId: req.body.userId 
        });
        let result;
        if(id && req.body.imageUrl ) {
             result = await Image.create({
                imageUrl: req.body.imageUrl,
                postId: id
            })
        } 
        res.status(200).json({
            id: id,
            post: req.body.post ? req.body.post : '',
            imageUrl: req.body?.imageUrl,
            comment:[],
            likes:0,
            shares:0
        })
    }catch(err){
        res.send(`error:${err.message}`)
    }
})

router.get('/', async(req, res) => {
    try {
        
      const posts = await fetchPost(req.body.userId)
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
        },{
            model: Comments,
            attributes: ['comments']
        },{
            model: Likes,
            attributes: ['likes']
        },{
            model: Shares,
            attributes: ['shares']
        }
        ]
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