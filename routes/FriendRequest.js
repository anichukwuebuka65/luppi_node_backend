const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()
const Friends = require('../models/FriendsModel')
const User = require('../models/UserModel')
const {putIdsInArray} = require('./Posts')


router.get('/',async(req, res) => {
    try {
        const userId = req.query.userId
        const ids = await Friends.findAll({
                            where: {
                                userId,
                                status: 'pending'
                        },
                        attributes: ['allfriendId'],
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
        res.json(result)
    } catch (error) {
        res.send("server error, try again")
    }
})

function addFriendFunc (status, friendId, userId) {
    const whereParams = {
        friendId,
        userId
    }

    switch (status) {
        case 'add':
            const added = Friends.create({
                friendId,
                userId,
                status: 'pending'
            })
            if (added) return 'success'
        case 'accept':
            return Friends.update({
                status: 'accepted'
            },{
                where: {
                    [Op.and]: whereParams        
                }
            })
        case 'decline':
            return Friends.destroy({
                where: {
                    [Op.and]: whereParams
                }
            })
        default:
            return 'unknown case';
    }
}

module.exports = router