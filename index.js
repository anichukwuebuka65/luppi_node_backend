const express = require('express')
const app = express()
const registerRouter = require('./routes/Register')
const loginRouter = require('./routes/login')
const postRouter = require('./routes/Posts')
const addFriendRouter = require('./routes/AddFriends')
const userProfileRouter = require('./routes/UserProfiles')
const authenticateUser = require('./middlewares/authenticateUser')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use(authenticateUser)
app.use('/posts', postRouter)
app.use('/addfriend', addFriendRouter)
app.use('/userprofiles', userProfileRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
})
