const {conn,  DataTypes} = require("../database/database")

const Comments = conn.define("comments",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postid: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'posts',
            key: 'id'
          },
        onDelete:"CASCADE"
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'users',
            key: 'id'
          }
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

Comments.sync()
.then(() => console.log("tables created successfully"))
.catch(error => console.log(error))

module.exports = Comments