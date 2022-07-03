const {conn,  DataTypes} = require("../database/database")

const PostImages = conn.define("post_images",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        references: "posts",
        referenceskey: "id"
    }
})

module.exports = PostImages