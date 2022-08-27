const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authenticateUser = require('../middlewares/authenticateUser')
const { Profile } = require('../models/ProfileModel')

router.post('/',async(req, res)=>{
    try { 
        const email = req.body.email.replace(/ /g,"")
        const pwd = req.body.password

        if(!email || !pwd)return res.status(500).json('missing credentials')
        const sanitize = /[!#$%`~*{};?/:+=<>(|)]/
       if(sanitize.test(email)) return res.status(401).json('invalid email')

        const user =  await User.findOne({
            where:{
                email: req.body.email
            },
            include:{
                model: Profile,
                attributes: ['profilepicture']
            }
        })

        if(!user) return res.status(400).json("invalid email")
        const validPassword = await bcrypt.compare(pwd, user.password)    
        if(!validPassword) throw new Error("invalid password")
        const token = jwt.sign({ id: user.id,email},process.env.SECRET,{ expiresIn: '24hr'})
        res.cookie('luppi', token,{ httpOnly:true, secure:true, sameSite: 'none'})
        const {id, firstName, lastName, user_profile} = user
        res.status(200).json({
            id,
            firstName,
            lastName,
            profilepicture: user_profile.profilepicture,
            isLoggedIn: true,
        })

    } catch (error) {
       res.status(401).send(error) 
    }
})

module.exports = router