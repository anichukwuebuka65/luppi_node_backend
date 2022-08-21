const {conn,  DataTypes} = require("../database/database")

const Image = conn.define("images",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // commentableId: {
    //     type: DataTypes.INTEGER,
    // },
    // commentableType: {
    //     type: DataTypes.STRING,
    // }
})

Image.sync()
.then(() => console.log("tables created successfully"))
.catch(error => console.log(error))

module.exports = Image