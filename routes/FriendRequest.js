const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()
const Friends = require('../models/FriendsModel')
const User = require('../models/UserModel')
const {putIdsInArray} = require('./Posts')

router.get('/count', async(req, res) => {

    const reqCount = Friends.count({
        where: {
            [Op.and]: {
                userId: req.body.userId,
                status: 'pending'
            }
        }
    })
})

router.get('/',async(req, res) => {
    try {
        const userId = req.body.userId
        const ids = await Friends.findAll({
                            where: {
                                userId,
                                status: 'pending'
                        },
                        attributes: ['friendId'],
                    })
        const result = await User.findAll({
            where: {
                id: {
                  [Op.in] : putIdsInArray(ids)
                }
            },
            attributes: ['id','firstname','lastname']
        }) 
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