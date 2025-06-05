const express = require('express');
const db = require('../database/db');

const router = express.Router();

// GET all animals
router.get('/', (req, res) => {
  db.all('SELECT * FROM animals', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET a single animal by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM animals WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Animal not found' });
    res.json(row);
  });
});

// CREATE a new animal
router.post('/', (req, res) => {
  const { name, species } = req.body;
  db.run(
    'INSERT INTO animals (name, species) VALUES (?, ?)',
    [name, species],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Animal created' });
    }
  );
});

// UPDATE an animal
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, species } = req.body;
  db.run(
    'UPDATE animals SET name = ?, species = ? WHERE id = ?',
    [name, species, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Animal updated' });
    }
  );
});

// DELETE an animal
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM animals WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Animal deleted' });
  });
});

module.exports = router;