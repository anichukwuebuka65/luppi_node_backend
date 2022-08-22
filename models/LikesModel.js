const {conn,  DataTypes} = require("../database/database")

const Likes = conn.define("likes",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
          }
    },
})

Likes.sync()
.then(() => console.log("tables created successfully"))
.catch(error => console.log(error))

module.exports = Likes