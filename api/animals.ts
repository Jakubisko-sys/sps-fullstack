import express, { Request, Response } from 'express';
import { Database } from 'sqlite3'; 
import db from '../database/db.ts';

const router = express.Router();

// Typ pro tělo požadavku při vytváření a aktualizaci zvířat
interface Animal {
  name: string;
  species: string;
}

// GET all animals
router.get('/', (req: Request, res: Response): void => {
  db.all('SELECT * FROM animals', [], (err: Error, rows: any[]) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET a single animal by id
router.get('/:id', (req: Request, res: Response): void => {
  const id = req.params.id;
  db.get('SELECT * FROM animals WHERE id = ?', [id], (err: Error, row: any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Animal not found' });
    res.json(row);
  });
});

// CREATE a new animal
router.post('/', (req: Request, res: Response): void => {
  const { name, species }: Animal = req.body;
  db.run(
    'INSERT INTO animals (name, species) VALUES (?, ?)',
    [name, species],
    (err: Error) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Animal created' });
    }
  );
});

// UPDATE an animal
router.put('/:id', (req: Request, res: Response): void => {
  const id = req.params.id;
  const { name, species }: Animal = req.body;
  db.run(
    'UPDATE animals SET name = ?, species = ? WHERE id = ?',
    [name, species, id],
    (err: Error) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Animal updated' });
    }
  );
});

// DELETE an animal
router.delete('/:id', (req: Request, res: Response): void => {
  const id = req.params.id;
  db.run('DELETE FROM animals WHERE id = ?', [id], (err: Error) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Animal deleted' });
  });
});

export default router;