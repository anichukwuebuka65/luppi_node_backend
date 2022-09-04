const express = require('express')
const app = express()
const registerRouter = require('./routes/Register')
const loginRouter = require('./routes/Login')
const logoutRouter = require("./routes/LogOut")
const {router} = require('./routes/Posts')
const FriendRequestRouter = require('./routes/FriendRequest')
const ProfileRouter = require('./routes/Profiles')
const friendsRouter = require('./routes/Friends')
const CommentRouter = require('./routes/Comments')
const UsersRouter = require('./routes/Users')
const LikeRouter = require('./routes/Likes')
const authenticateUser = require('./middlewares/authenticateUser')
const cors = require('cors')
const connCheck = require('./middlewares/databaseConn')
require('dotenv').config()
const imagekitAuth = require('./routes/Auth')
const cookieParser = require('cookie-parser')

app.set('trust proxy', 1)
app.use(cors({
    //origin:"https://luppi-react.herokuapp.com", 
    origin:"http://localhost:3000",
    credentials: true}))
app.use(connCheck)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.get("/",(req, res) => {
    res.json('deployed successfully')})
app.use('/auth', imagekitAuth)
app.use(authenticateUser)
app.use('/logout', logoutRouter)
app.use('/comment', CommentRouter)
app.use('/users', UsersRouter)
app.use('/like', LikeRouter)
app.use('/posts', router)
app.use('/friends', friendsRouter)
app.use('/friendrequest',  FriendRequestRouter)
app.use('/profile', ProfileRouter)
  

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
})
