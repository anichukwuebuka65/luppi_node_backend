const express = require("express")
const { Profile } = require("../models/ProfileModel")
const User = require("../models/UserModel")
const router = express.Router()

 router.get("/", async (req, res) => {
    try {
        const users = await User.findAll({
            limit: 5,
            raw: true,
            attributes: ["id","firstName","lastName"],
            include: {
                model: Profile,
                attributes: ["profilepicture"]
            }
        })

        const filteredUsers = users.filter((user)=> user.id !== req.body.userId)

        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).send("server error")
    }
})

module.exports = router