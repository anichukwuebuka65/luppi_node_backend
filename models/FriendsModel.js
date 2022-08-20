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

await Friends.sync();

module.exports = Friends 