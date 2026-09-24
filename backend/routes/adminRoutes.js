const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

/**
 * POST /api/admin/login
 * Body: { "username": "admin", "password": "password123" }
 * Response: HTTP 200 { "status": "success", "token": "<JWT>" }
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'password123';

  if (!username || !password || username !== expectedUsername || password !== expectedPassword) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid credentials'
    });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({
      status: 'error',
      message: 'Authentication error: Server secret configuration missing'
    });
  }

  const payload = {
    adminId: username,
    role: 'admin'
  };

  const token = jwt.sign(payload, secret, { expiresIn: '8h' });

  return res.status(200).json({
    status: 'success',
    token
  });
});

module.exports = router;
