const {DataTypes,conn} = require('../database/database.js')

const Profile = conn.define('user_profile',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    profilepicture: {
        type: DataTypes.STRING,
      },
    age: {
        type: DataTypes.INTEGER,
    },
    gender: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: 'users',
        referencesKey: 'id'
    }  
})

await Profile.sync();

module.exports = {
 Profile
} 