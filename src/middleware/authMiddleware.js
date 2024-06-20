const { verifyToken } = require('../src/auth');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decodedToken = await verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

module.exports = authMiddleware;
