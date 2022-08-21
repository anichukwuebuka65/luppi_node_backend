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

        if(!email && !pwd)return res.status(500).send('missing credentials')
        const sanitize = /[!#$%`~*{};?/:+=<>(|)]/
       if(sanitize.test(email)) return res.status(401).send('invalid email')

        const {id,password,firstName,lastName, user_profile} =  await User.findOne({
            where:{
                email: req.body.email
            },
            include:{
                model: Profile,
                attributes: ['profilepicture']
            }
        })

        if(!id) return res.status(400).send("invalid email")
        const validPassword = await bcrypt.compare(pwd, password)    
        if(!validPassword) throw new Error("invalid password")
        const token = jwt.sign({ id,email},process.env.SECRET,{ expiresIn: '1hr'})
        res.cookie('luppi', token,{ httpOnly: true})
        res.status(200).json({
            id,
            firstName,
            lastName,
            profilepic: user_profile.profilepicture,
            isLoggedIn: true
        })

    } catch (error) {
       res.status(401).send(error) 
    }
})

module.exports = router