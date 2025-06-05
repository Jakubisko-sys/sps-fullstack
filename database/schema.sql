-- Vytvor tabulku "visitors"
CREATE TABLE IF NOT EXISTS visitors ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL, 
  lastname TEXT NOT NULL
);

--vytvor tabulku "animals"
CREATE TABLE IF NOT EXISTS animals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  species TEXT NOT NULL
);

--vytvor tabulku "visits"
CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id INTEGER NOT NULL,
  animal_id INTEGER NOT NULL,
  visit_date DATE NOT NULL,
  FOREIGN KEY (visitor_id) REFERENCES visitors(id),
  FOREIGN KEY (animal_id) REFERENCES animals(id)
);