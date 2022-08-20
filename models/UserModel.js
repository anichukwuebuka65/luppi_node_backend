// const {Sequelize, DataTypes} = require('sequelize')
// const  conn = new Sequelize('luppi_app','root','',{host: 'localhost', dialect: 'mysql'})
const {DataTypes,conn} = require('../database/database.js');
const Friends = require('./FriendsModel.js');
const Post = require('./PostModel')
const Image = require('./ImagesModel')
const Comments = require('./CommentsModel')
const Likes = require('./LikesModel')
const Shares = require('./SharesModel')
const {Profile} = require('./ProfileModel')

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

await User.sync();

User.hasMany(Post);
//User.hasMany(Friends);
//User.hasMany(User);
// User.hasMany(Image, {
//   foreignKey: 'commentableId',
//   constraints: false,
//   scope: {
//     commentableType: 'user'
//   }
// });
// Image.belongsTo(User,{ 
//   foreignKey: 'commentableId',
//   constraints: false
// })
Post.hasOne(Image);
Post.hasMany(Comments);
Post.hasOne(Likes);
Post.hasOne(Shares);
Image.belongsTo(Post)
Comments.belongsTo(Post)
Likes.belongsTo(Post)
Shares.belongsTo(Post)
 

Image.addHook("afterFind", findResult => {
  if (!Array.isArray(findResult)) findResult = [findResult];
  for (const instance of findResult) {
    if (instance.commentableType === "user" && instance.user !== undefined) {
      instance.commentable = instance.user;
    } else if (instance.commentableType === "post" && instance.post !== undefined) {
      instance.commentable = instance.post;
    }
    // To prevent mistakes:
    delete instance.user;
    delete instance.dataValues.user;
    delete instance.post;
    delete instance.dataValues.post;
  }
});

User.hasOne(Profile);
Post.belongsTo(User);
//User.belongsToMany(User,{ as: 'allfriends', through: Friends});
Profile.belongsTo(User);

module.exports = User 