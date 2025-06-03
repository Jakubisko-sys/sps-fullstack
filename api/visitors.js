const express = require('express');
const db = require('../database/db');

const router = express.Router();

router.get('/visitors', (req, res) => {
  db.all('SELECT * FROM visitors', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;