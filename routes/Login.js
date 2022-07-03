const express = require('express')
const router = express.Router()
const {User} = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authenticateUser = require('../middlewares/authenticateUser')

router.post('/',async(req, res)=>{
    console.log('hi')
    try { 
        const email = req.body.email.replace(/ /g,"")
        const password = req.body.password

        if(!email && !password)return res.send('missing credentials')
        const sanitize = /[!#$%`~*{};?/:+=<>(|)]/
       if(sanitize.test(email)) return res.send('invalid email')

        const user =  await User.findOne({
            where:{email: req.body.email},
            attributes:['id','password']})

        if(!user) return res.send("invalid email")
        const validPassword = await bcrypt.compare(password,user.password)    
        if(!validPassword) throw new Error("invalid password")
        const token = jwt.sign({userId: user.id,email},'secret',{algorithm:'HS256', expiresIn: '1hr'})
        //res.cookie('luppi2',token,{maxAge: 4000, httpOnly: true})
        
        //res.set("Access-Control-Allow-Origin", "*")
        res.send(token)

    } catch (error) {
       res.end(error.message) 
    }
})

module.exports = router