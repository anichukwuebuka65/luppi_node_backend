const {conn,  DataTypes} = require("../database/database")

const Image = conn.define("image",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commentableId: {
        type: DataTypes.INTEGER,
    },
    commentableType: {
        type: DataTypes.STRING,
    }
})

module.exports = Image