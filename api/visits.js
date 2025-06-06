const express = require('express');
const db = require('../database/db');

const router = express.Router();

// GET all visits
router.get('/', (req, res) => {
  db.all('SELECT * FROM visits', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET a single visit by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM visits WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Visit not found' });
    res.json(row);
  });
});

// CREATE a new visit
router.post('/', (req, res) => {
  const { visitor_id, animal_id, visit_date } = req.body;
  db.run(
    'INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (?, ?, ?)',
    [visitor_id, animal_id, visit_date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Visit created' });
    }
  );
});

// UPDATE a visit
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { visitor_id, animal_id, visit_date } = req.body;
  db.run(
    'UPDATE visits SET visitor_id = ?, animal_id = ?, visit_date = ? WHERE id = ?',
    [visitor_id, animal_id, visit_date, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Visit updated' });
    }
  );
});

// DELETE a visit
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM visits WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Visit deleted' });
  });
});

module.exports = router;