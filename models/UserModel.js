const {Sequelize, DataTypes} = require('sequelize')
const  conn = new Sequelize('luppi_app','root','',{host: 'localhost', dialect: 'mysql'})
const {Post} = require('./PostModel')
const {UserProfile} = require('./UserProfileModel')

const User = conn.define('users',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
})

User.hasOne(Post);
User.hasOne(UserProfile);
Post.belongsTo(User);
UserProfile.belongsTo(User);

module.exports = {
  User,
  UserProfile
} 