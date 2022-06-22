const {DataTypes,conn} = require('../database/database.js')

const Post = conn.define('posts',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    postName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    userId: {
        type: DataTypes.INTEGER,
        references: 'users',
        referencesKey: 'id'
    }  
})

module.exports = Post
