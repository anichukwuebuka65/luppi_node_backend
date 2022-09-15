const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()
const Friends = require('../models/FriendsModel')
const User = require('../models/UserModel')
const {putIdsInArray} = require('./Posts')

router.get('/count', async(req, res) => {

    const reqCount = await Friends.count({
        where: {
            [Op.and]: {
                userId: req.body.userId,
                status: 'pending'
            }
        }
    })
    res.json(reqCount)
})

router.get('/',async(req, res) => {
    try {
        const userId = req.body.userId
        const ids = await Friends.findAll({
                            where: {
                                [Op.and]:{
                                    userId,
                                    status: 'pending'
                                }
                               
                        },
                        attributes: ['friendId'],
                    })
                    const result = await User.findAll({
                        where: {
                            id: {
                                [Op.in] : ids
                            }
                        },
                        attributes: ['id','firstname','lastname']
                    }) 
                    console.log(result)
        res.json(result)            
    } catch (error) {
        res.json(error)
    }
})

router.post('/',async(req, res) => {
    try {
        const {friendId, userId} = req.body
        const {status} = req.query
        const result = await addFriendFunc(status, friendId, userId)
        console.log(result)
        res.json(result)
    } catch (error) {
        res.send("server error, try again")
    }
})

async function addFriendFunc (status, friendId, userId) {
    const whereParams = {
        friendId,
        userId
    }

    switch (status) {
        case 'add':
            if(friendId === userId) return res.status(400).send("You can not add yourself as friend")
            const added = await Friends.create({
                friendId,
                userId,
                status: 'pending'
            })
            if (added) return 'success'
        case 'accept':
            return await Friends.update({
                status: 'accepted'
            },{
                where: {
                    [Op.and]: whereParams        
                }
            })
        case 'decline':
            return await Friends.destroy({
                where: {
                    [Op.and]: whereParams
                }
            })
        default:
            return 'unknown case';
    }
}

module.exports = router