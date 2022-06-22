const authenticateUser = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const token = req.headers["authorization"].split(" ")[1]

  if (token == null) return res.status(400).send("unauthorized");
  try {
      const { userId } = jwt.verify(token,'secret')
      req.body.user = userId
      next()
  } catch (error) {
    if(error) return res.send("invalid token")
  }
  
  
 
}   
module.exports = authenticateUser