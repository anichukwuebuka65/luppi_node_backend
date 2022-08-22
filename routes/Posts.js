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
const { Profile } = require('../models/ProfileModel')

router.post('/', async(req, res) => {
    try {
        const {id} = await Post.create({
            post: req.body.post ? req.body.post : '',
            userId: req.body.userId 
        });
        await Likes.create({
            likes: 0,
            postId: id
        })
        
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
            image: {
                imageUrl: req.body?.imageUrl,
            },
             comment:[],
             like:{likes:0},
             shares:0
        })
    }catch(err){
        res.send(`error:${err.message}`)
    }
})

router.get('/', async(req, res) => {
    try {
        const ids = await fetchIds(req.body.userId, Friends)
        const posts = await fetchPost(ids)
        res.status(200).json(posts)
    } 
     catch (error) {
        res.status(400).send(error.message)
    }
})

async function fetchIds(user, friends) {
    const result = await friends.findAll({ where: {userId: user},
         attributes: ['friendId'],  
    })
    return putIdsInArray(result, user)
}

 const putIdsInArray = (result, user, ) => {
    const ids = [user]
    result.map(data => ids.push(data.friendId))
    return ids
}

async function fetchPost(ids) { 
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
            //attributes: [],
            limit: 2,
             include: {
                 model: User,
                 attributes:["id"],
                include:{
                    model: Profile,
                    attributes: ['profilepicture']
                }
             }
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
  }

module.exports = {
    router,
    putIdsInArray,
    fetchPost
}