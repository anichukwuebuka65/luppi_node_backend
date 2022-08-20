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

Shares.sync()
.then(() => console.log("tables created successfully"))
.catch(error => console.log(error))

module.exports = Shares