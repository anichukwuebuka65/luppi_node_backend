const {DataTypes,conn} = require('../database/database.js')

const Friends = conn.define('friends',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    friendUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 'users',
        referencesKey: 'id'
    }  
})

module.exports = Friends 