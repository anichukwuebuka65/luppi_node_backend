
const authenticateUser = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const token = req.body.authorize

  if (token == null) return res.sendStatus(401)
  try {
    const decoded = jwt.verify(token, "secret")
    req.body.user = decoded
    next()
  } catch (err) {
    
   if(err) res.sendStatus(403).send(err.message)
  }
  
}

module.exports = authenticateUser