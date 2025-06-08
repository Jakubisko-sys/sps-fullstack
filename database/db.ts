import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

// Typ pro SQLite
sqlite3.verbose();

// Vytvoření databáze
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const schema: string = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

// Vykona se pri spopuštění aplikace
db.exec(schema, (err: Error | null) => {
  if (err) {
    console.error('Error initializing schema:', err.message);
  } else {
    console.log('Database schema loaded.');
  }
});

export default db;