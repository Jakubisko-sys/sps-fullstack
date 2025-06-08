import express, { Request, Response } from 'express';
import { Database } from 'sqlite3'; // Typ pro SQLite (pokud používáš sqlite3)

// Import databáze (typ můžeš upravit podle tvého nastavení)
import db from '../database/db';

const router = express.Router();

// Typ pro tělo požadavku při vytváření a aktualizaci návštěvníků
interface Visitor {
  firstname: string;
  lastname: string;
}

// GET all visitors
router.get('/', (req: Request, res: Response): void => {
  db.all('SELECT * FROM visitors', [], (err: Error, rows: any[]) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET a single visitor by id
router.get('/:id', (req: Request, res: Response): void => {
  const id = req.params.id;
  db.get('SELECT * FROM visitors WHERE id = ?', [id], (err: Error, row: any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Visitor not found' });
    res.json(row);
  });
});

// CREATE a new visitor
router.post('/', (req: Request, res: Response): void => {
  const { firstname, lastname }: Visitor = req.body;
  db.run(
    'INSERT INTO visitors (firstname, lastname) VALUES (?, ?)',
    [firstname, lastname],
    (err: Error) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Visitor created' });
    }
  );
});

// UPDATE a visitor
router.put('/:id', (req: Request, res: Response): void => {
  const id = req.params.id;
  const { firstname, lastname }: Visitor = req.body;
  db.run(
    'UPDATE visitors SET firstname = ?, lastname = ? WHERE id = ?',
    [firstname, lastname, id],
    (err: Error) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Visitor updated' });
    }
  );
});

// DELETE a visitor
router.delete('/:id', (req: Request, res: Response): void => {
  const id = req.params.id;
  db.run('DELETE FROM visitors WHERE id = ?', [id], (err: Error) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Visitor deleted' });
  });
});

export default router;