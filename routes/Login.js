const express = require('express')
const router = express.Router()
const {User} = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authenticateUser = require('../middlewares/authenticateUser')

router.post('/',async(req, res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const user =  await User.findOne({
            where:{email: req.body.email},
            attributes:['id','firstName','lastName','password']})
        if(!user) throw new Error("invalid email")
        const validPassword = await bcrypt.compare(password,user.password)    
        if(!validPassword) throw new Error("invalid password")
        const token = jwt.sign({userId: user.id,email},"secret",{algorithm:'HS256', expiresIn: '50000'})
        //res.cookie('luppi2',token,{maxAge: 4000, httpOnly: true})
        
        res.send(token)

    } catch (error) {
       res.end(error.message) 
    }
})

module.exports = router