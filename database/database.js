const {Sequelize, DataTypes} = require('sequelize')
require("dotenv").config()
//const  conn = new Sequelize('luppi_app','root','',{host: 'localhost', dialect: 'mysql'})
const  conn = new Sequelize(process.env.DEV_DATABASE_URL,{
    // "dialect": "postgres",
    // "ssl": true,
    // "dialectOptions": {
         "ssl": true
    // }
})
   
 conn.authenticate()
 .then(data =>console.log("connected"))
.catch(error => console.log(error))
   
module.exports = {
    conn, DataTypes
}