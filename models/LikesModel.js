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
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Likes