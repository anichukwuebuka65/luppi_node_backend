const {DataTypes,conn} = require('../database/database.js')
const PostImages = require('./PostImagesModel.js')

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
    }  
})

Post.hasMany(PostImages)
PostImages.belongsTo(Post)

module.exports = Post
