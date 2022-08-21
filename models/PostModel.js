const {DataTypes,conn} = require('../database/database.js')
const Images = require('./ImagesModel.js')

const Post = conn.define('posts',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    post: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    userId: {
        type: DataTypes.INTEGER,
        references: 'users',
        referencesKey: 'id'
    },  
    
})

Post.sync()
.then(() => console.log("tables created successfully"))
.catch(error => console.log(error))

module.exports = Post
