const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticate = (req, res, next) => {
  if (!req.body){
    console.log("no cookie")
  } 
  const token = req.body?.authToken;
  // if (!authHeader) {
  //   return res.status(401).json({ error: 'Access denied. No token provided.' });
  // }
  if (!token) {
    console.log("Access denied. No token provided.")
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};


const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied. Unauthorized role.' });
    }
    next();
};

module.exports = { authenticate, authorize };
