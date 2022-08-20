const {DataTypes,conn} = require('../database/database.js')

const Friends = conn.define('friends',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: 'users',
      referencesKey: 'id'
      },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 'users',
        referencesKey: 'id'
    },
    status: {
      type: DataTypes.STRING
    }  
})

Friends.sync()
.then(() => console.log("tables created successfully"))
.catch(error => console.log(error))

module.exports = Friends 