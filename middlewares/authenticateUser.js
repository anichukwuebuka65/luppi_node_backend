const authenticateUser = (req, res, next) => {
   const jwt = require('jsonwebtoken');
   const token = req.cookies.luppi

   if (token === null) return res.status(400).send("unauthorized");
  try {
      const {id} = jwt.verify(token, process.env.SECRET)
      if(id) {
        req.body.userId = id
        next()
      }
  } catch (error) {
    if(error) return res.status(400).send("invalid token")
  } 
}   
module.exports = authenticateUser