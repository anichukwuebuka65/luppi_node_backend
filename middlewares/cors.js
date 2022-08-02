
const cors = (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*")
    res.set("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT")
    res.set("Access-Control-Allow-Headers", "Content-Type")
    next()
}

module.exports = cors