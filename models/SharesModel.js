const {conn,  DataTypes} = require("../database/database")

const Shares = conn.define("shares",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shares: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Shares