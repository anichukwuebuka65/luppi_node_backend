const {DataTypes,conn} = require('../database/database.js')
const Images = require('./ImagesModel.js')

const Post = conn.define('post',{
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

await Post.sync();

module.exports = Post
