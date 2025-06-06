const express = require('express');
const db = require('../database/db');

const router = express.Router();

// GET all visitors
router.get('/', (req, res) => {
  db.all('SELECT * FROM visitors', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET a single visitor by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM visitors WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Visitor not found' });
    res.json(row);
  });
});

// CREATE a new visitor
router.post('/', (req, res) => {
  const { firstname, lastname } = req.body;
  db.run(
    'INSERT INTO visitors (firstname, lastname) VALUES (?, ?)',
    [firstname, lastname],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Visitor created' });
    }
  );
});

// UPDATE a visitor
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { firstname, lastname } = req.body;
  db.run(
    'UPDATE visitors SET firstname = ?, lastname = ? WHERE id = ?',
    [firstname, lastname, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Visitor updated' });
    }
  );
});

// DELETE a visitor
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM visitors WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Visitor deleted' });
  });
});

module.exports = router;