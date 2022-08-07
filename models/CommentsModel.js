const {conn,  DataTypes} = require("../database/database")

const Comments = conn.define("comments",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Comments