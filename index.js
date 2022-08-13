const express = require('express')
const app = express()
const registerRouter = require('./routes/Register')
const loginRouter = require('./routes/login')
const {router} = require('./routes/Posts')
const FriendRequestRouter = require('./routes/FriendRequest')
const ProfileRouter = require('./routes/Profiles')
const authenticateUser = require('./middlewares/authenticateUser')
const cors = require('cors')
const connCheck = require('./middlewares/databaseConn')
require('dotenv').config()
const imagekitAuth = require('./routes/Auth')
const cookieParser = require('cookie-parser')


app.use(cors({origin: true, credentials: true}))
app.use(connCheck)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use(authenticateUser)
app.use('/posts', router)
app.use('/friendrequest',  FriendRequestRouter)
app.use('/profile', ProfileRouter)
app.use('/auth', imagekitAuth)
  

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
})
