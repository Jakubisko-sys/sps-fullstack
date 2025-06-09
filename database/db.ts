import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

// Typ pro SQLite
sqlite3.verbose();

// Získání cesty k souboru a odstranění "file://" prefixu
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Pokud je to Windows, odstraňujeme prefix file:// a měníme zpětná lomítka na normální
const isWindows = process.platform === 'win32';
const correctedDirname = isWindows ? __dirname.substring(1) : __dirname;

// Vytvoření databáze
const db = new sqlite3.Database(path.join(correctedDirname, 'database.sqlite'));

// Načtení schématu databáze
const schema: string = fs.readFileSync(path.join(correctedDirname, 'schema.sql'), 'utf8');

// Vykoná se při spuštění aplikace
db.exec(schema, (err: Error | null) => {
  if (err) {
    console.error('Error initializing schema:', err.message);
  } else {
    console.log('Database schema loaded.');
  }
});

export default db;