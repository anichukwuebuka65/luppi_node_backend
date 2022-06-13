const {Sequelize} = require('sequelize')
const  conn = new Sequelize('luppi_app','root','',{host: 'localhost', dialect: 'mysql'})

module.exports = {
    conn
}