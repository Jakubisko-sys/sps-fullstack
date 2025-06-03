const express = require('express');
const db = require('../database/db');

const router = express.Router();

router.get('/animals', (req, res) => {
  db.all('SELECT * FROM animals', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;