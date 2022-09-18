const express = require('express')
const router = express.Router()
const Post = require('../models/PostModel')
const Friends = require('../models/FriendsModel')
const Image = require('../models/ImagesModel')
const User = require('../models/UserModel')
const { Op, Sequelize } = require('sequelize')
const Comment = require('../models/CommentsModel')
const Likes = require('../models/LikesModel')
const Shares = require('../models/SharesModel')
const { Profile } = require('../models/ProfileModel')

router.get('/', async(req, res) => {
    try {
        const ids = await fetchIds(req.body.userId, Friends)
        const posts = await fetchPost(ids,parseInt(req.query.offset))
        res.status(200).json(posts)
    } 
     catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

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

router.delete("/",async(req, res) => {
    const postId = req.query.postId
    try {
        const {userId} = await Post.findOne({
            where:{
                id:postId
            },
            attributes : ["userId"]
            })
        if (userId == req.body.userId) {
            const result = Post.destroy({
                    where: {
                        id: postId
                    }
                })   
            res.status(200).json(result)  
        }
        else{
            res.status(400).end("unauthorized")
        }
    } catch (error) {
        res.status(500).end("pls try again")
    }
 })

async function fetchIds(user, friends) {
    const result = await friends.findAll({ where: {userId: user},
         attributes: ['friendId'],  
    })
    return putIdsInArray(result, user)
}

 const putIdsInArray = (result, user, ) => {
    const ids = [user,1]
    result.map(data => ids.push(data.friendId))
    return ids
}

async function fetchPost(ids, offset) { 
    const posts = await Post.findAll({
        where: {
            userId: {
            [Op.in] : ids
            },
        },
        // attributes: {
        //     include: [
        //         [Sequelize.literal(`(
        //             SELECT COUNT(*) 
        //             FROM comments AS comment
        //             WHERE 
        //                 comment.postId = posts.id
        //         )`),"commentsCount"]
        //     ],
        //   },
        offset: offset, 
        limit:15,
        include: [{
            model: User,
            attributes: ['firstName','lastName'],
            include:{
                model: Profile,
                attributes:['profilepicture']
            } 
        }, {
            model: Comment,
            attributes: []
        },{
            model: Likes,
            attributes: ['likes']
        },{
            model: Shares,
            attributes: ['shares']
        }]
    })
   
    return posts
  }

module.exports = {
    router,
    putIdsInArray,
    fetchPost
}