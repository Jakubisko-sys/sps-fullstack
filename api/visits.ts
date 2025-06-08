import express, { Request, Response } from 'express';
import { Database } from 'sqlite3'; // Typ pro SQLite (pokud používáš sqlite3)

// Import databáze (typ můžeš upravit podle tvého nastavení)
import db from '../database/db';

const router = express.Router();

// Typ pro tělo požadavku při vytváření a aktualizaci návštěv
interface Visit {
  visitor_id: number;
  animal_id: number;
  visit_date: string;
}

// GET all visits
router.get('/', (req: Request, res: Response): void => {
  db.all('SELECT * FROM visits', [], (err: Error, rows: any[]) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET a single visit by id
router.get('/:id', (req: Request, res: Response): void => {
  const id = req.params.id;
  db.get('SELECT * FROM visits WHERE id = ?', [id], (err: Error, row: any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Visit not found' });
    res.json(row);
  });
});

// CREATE a new visit
router.post('/', (req: Request, res: Response): void => {
  const { visitor_id, animal_id, visit_date }: Visit = req.body;
  db.run(
    'INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (?, ?, ?)',
    [visitor_id, animal_id, visit_date],
    (err: Error) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Visit created' });
    }
  );
});

// UPDATE a visit
router.put('/:id', (req: Request, res: Response): void => {
  const id = req.params.id;
  const { visitor_id, animal_id, visit_date }: Visit = req.body;
  db.run(
    'UPDATE visits SET visitor_id = ?, animal_id = ?, visit_date = ? WHERE id = ?',
    [visitor_id, animal_id, visit_date, id],
    (err: Error) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Visit updated' });
    }
  );
});

// DELETE a visit
router.delete('/:id', (req: Request, res: Response): void => {
  const id = req.params.id;
  db.run('DELETE FROM visits WHERE id = ?', [id], (err: Error) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Visit deleted' });
  });
});

export default router;