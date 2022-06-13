const express = require('express')
const router = express.Router()
const {User} = require('../models/UserModel')
const bcrypt = require('bcrypt')

router.post('/', async(req, res) => {
    try { 
        const password = await bcrypt.hash(req.body.password,5)
        const {firstName, lastName} = await User.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname, 
        email: req.body.email, 
        password: password
       });
       res.json({firstName, lastName})
    }catch(err){
        res.send(`error:${err.message}`)
    }
   
   
})

module.exports = router