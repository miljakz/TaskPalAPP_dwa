const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Middleware to protect routes
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password
    });
    res.status(201).send({ message: 'User registered successfully', user: userRecord });
  } catch (error) {
    res.status(400).send({ message: 'Error registering user', error: error.message });
  }
});

// Login user (This should ideally be handled on the client side)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Normally, Firebase Authentication handles login on the client side and returns an ID token.
    // Here, we're simulating a successful login by generating a custom token.
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);
    
    res.send({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(400).send({ message: 'Error logging in', error: error.message });
  }
});

// Verify user token
router.post('/verifyToken', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.send({ message: 'Token verified successfully', decodedToken });
  } catch (error) {
    res.status(401).send({ message: 'Invalid token', error: error.message });
  }
});

// Logout user (optional, typically handled client-side)
router.post('/logout', (req, res) => {
  // This endpoint can be used to invalidate tokens or handle any logout-specific logic if necessary.
  res.send({ message: 'Logged out successfully' });
});

// A protected route to test authentication
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.user.uid);
    res.send({ message: 'Authenticated user', user: userRecord });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user profile', error: error.message });
  }
});

module.exports = router;
