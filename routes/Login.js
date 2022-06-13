const express = require('express')
const router = express.Router()
const {User} = require('../models/UserModel')

router.post('/login',async(req, res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const user =  User.findOne({
            where:{email: email},
            attributes: ["firstName", "lastName","password"]})
        if(!user) res.end('invalid email')
        if(user.password !== password) res.end("invalid password") 
          
    } catch (error) {
        
    }
})