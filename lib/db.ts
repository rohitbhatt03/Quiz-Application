import Database from "better-sqlite3";

const db = new Database("quiz.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    text TEXT,
    options TEXT,
    correct_index INTEGER
  );
`);


export default db;
