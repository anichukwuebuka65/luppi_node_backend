const express = require('express')
const app = express()
const registerRouter = require('./routes/Register')
const postRouter = require('./routes/Posts')
const userProfileRouter = require('./routes/UserProfiles')

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get("/", (req, res)=>{
    res.send("hello from express again")
})

app.use('/register', registerRouter)
app.use('/posts', postRouter)
app.use('/userprofiles', userProfileRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
})
