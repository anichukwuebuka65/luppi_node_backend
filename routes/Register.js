const express = require('express')
const router = express.Router()
const {User} = require('../models/UserModel')

router.post('/', async(req, res) => {
    try { 
        const {firstName, lastName} = await User.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname, 
        email: req.body.email, 
        password: req.body.password
       });
       res.json({firstName, lastName})
    }catch(err){
        res.send(`error:${err.message}`)
    }
   
   
})

module.exports = router