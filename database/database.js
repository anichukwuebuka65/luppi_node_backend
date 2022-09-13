const {Sequelize, DataTypes} = require('sequelize')
require("dotenv").config()
const  conn = new Sequelize('luppi_app','root','',{host: 'localhost', dialect: 'mysql'})
// const  conn = new Sequelize(process.env.DATABASE_URL,{  
//     dialect: "postgres",
//      dialectOptions: {
//          ssl: {
//             require: true,
//            rejectUnauthorized : false
//          }
//      }
// })
   
 conn.authenticate()
 .then(data =>console.log("connected"))
.catch(error => console.log("the error is THAT" + error))
   
module.exports = {
    conn, DataTypes
}