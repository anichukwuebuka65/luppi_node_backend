const {DataTypes,conn} = require('../database/database.js')

const Profile = conn.define('user_profiles',{
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
        references: {
            model: 'users',
            key: 'id'
          }
    }  
})

Profile.sync()
.then(() => console.log("tables created successfully"))
.catch(error => console.log(error))

module.exports = {
 Profile
} 