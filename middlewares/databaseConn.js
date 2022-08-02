const conn = require('../database/database')

const databaseConn = (req, res, next) => {
    if (!conn) return res.status(500).send('database error')
    next()
}

module.exports = databaseConn