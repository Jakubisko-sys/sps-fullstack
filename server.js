const express = require('express');
const path = require('path');

// const { initializeDatabase } = require('./database/db'); // vytváření databáze

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const visitorsRoutes = require('./api/visitors');
app.use('/api/visitors', visitorsRoutes);

const animalsRoutes = require('./api/animals');
app.use('/api/animals', animalsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});