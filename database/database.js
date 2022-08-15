const {Sequelize, DataTypes} = require('sequelize')
//const  conn = new Sequelize('luppi_app','root','',{host: 'localhost', dialect: 'mysql'})
const  conn = new Sequelize("d3ii26o3m7sc1j","xhjfbekprllewj",
"c70979f0ea64181d982821122002011251d8a02161d4a4efac4fabe0c2fc8622",{
    host: "ec2-34-193-44-192.compute-1.amazonaws.com",
    dialect: "postgres"
})

conn.authenticate()
.then(data =>console.log("connected"))
.catch(error => console.log(error))
    
module.exports = {
    conn, DataTypes
}