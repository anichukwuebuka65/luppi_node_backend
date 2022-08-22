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
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'posts',
            key: 'id'
          }
    },
})

Comments.sync()
.then(() => console.log("tables created successfully"))
.catch(error => console.log(error))

module.exports = Comments