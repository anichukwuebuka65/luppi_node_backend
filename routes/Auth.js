const express = require('express')
const router = express.Router()
const ImageKit = require('imagekit')
const imagekit = new ImageKit({
    privateKey: 'private_jcJxi34/wUF/W8ht7WJxzmX+VPc=',
    publicKey: 'public_Xd2RM8ChiA2AeLH5NTe7kHEl8JQ=',
    urlEndpoint: 'https://ik.imagekit.io/feov916dg/',
})

router.get('/',(req, res) => {
    const authenticationParameters = imagekit.getAuthenticationParameters()
    res.json(authenticationParameters)
})
module.exports = router