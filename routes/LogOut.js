const express = require('express')
const router = express.Router()

router.get('/',(req, res) => {
    res.clearCookie("luppi").send("loggedOut")
})

module.exports = router