const express = require('express');
const router = express.Router();
const db = require('../db'); // Your DB connection module

router.post('/sync-user', async (req, res) => {
  const { id, email, name, role, wallet_address } = req.body;
  try {
    await db.query(
      'INSERT INTO users (id, email, name, role, wallet_address) VALUES (?, ?, ?, ?, ?)',
      [id, email, name, role || 'student', wallet_address || null]
    );
    res.status(200).json({ message: 'User synchronized' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      // User already exists, ignore or update as needed
      res.status(200).json({ message: 'User already exists' });
    } else {
      res.status(500).json({ error: 'Database error', details: error });
    }
  }
});

module.exports = router;