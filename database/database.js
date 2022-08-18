const {Sequelize, DataTypes} = require('sequelize')
require("dotenv").config()
//const  conn = new Sequelize('luppi_app','root','',{host: 'localhost', dialect: 'mysql'})
const  conn = new Sequelize(process.env.DATABASE_URL)
   
 conn.authenticate()
 .then(data =>console.log("connected"))
.catch(error => console.log(error))
   
module.exports = {
    conn, DataTypes
}