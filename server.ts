import express, { Request, Response } from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Získání cesty k adresáři (ekvivalent __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const { initializeDatabase } = require('./database/db'); // vytváření databáze

const app = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

import visitorsRoutes from './api/visitors.ts';
app.use('/api/visitors', visitorsRoutes);

import animalsRoutes from './api/animals.ts';
app.use('/api/animals', animalsRoutes);

import visitsRoutes from './api/visits.ts';
app.use('/api/visits', visitsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});