const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { Profile } = require('../models/ProfileModel')

router.post('/', async(req, res) => {
    const nameRegex = /^[A-Za-z0-9]{3,15}$/;
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,20}$/;
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const validFirstname = nameRegex.test( req.body.firstname)
    const validLastname = nameRegex.test(req.body.lastname)
    const validPwd = pwdRegex.test(req.body.password)
    const validEmail = emailRegex.test(req.body.email)
    console .log(validPwd)

    if(!validFirstname || !validLastname || !validPwd || !validEmail) return res.status(400).send('credentials cannot be accepted')

        const createUser = async() => {
            const oldUser = await User.findOne({where:{email: req.body.email},attributes:['email']})
            if(oldUser) return res.send('email already taken')
            const password = await bcrypt.hash(req.body.password,5)
            const {id,firstName, lastName} = await User.create({
            firstName:req.body.firstname ,
            lastName:req.body.lastname, 
            email: req.body.email, 
            password: password
            });
            Profile.create({
                userId: id
            })
            return res.json({firstName, lastName})
        } 
       
       createUser()
   
})

module.exports = router