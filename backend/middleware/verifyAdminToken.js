const jwt = require('jsonwebtoken');

/**
 * Admin Authentication Middleware
 * Verifies JWT token supplied in Authorization: Bearer <token> header.
 * Uses process.env.JWT_SECRET for verification.
 */
function verifyAdminToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized: Missing or malformed Authorization header'
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized: Token missing'
    });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({
      status: 'error',
      message: 'Authentication error: Server secret configuration missing'
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized: Invalid or expired token'
      });
    }

    req.admin = decoded;
    next();
  });
}

module.exports = verifyAdminToken;
