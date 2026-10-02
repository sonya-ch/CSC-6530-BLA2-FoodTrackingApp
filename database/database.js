import * as SQLite from 'expo-sqlite';

let db;

// To use: const db = await getDatabase();
export async function getDatabase() {
  if (!db) {
    //Create and Open SQLite Database, name foodtracking.db
    //User don't need to do anything
    db = await SQLite.openDatabaseAsync('foodtracking.db');
  }

  return db;
}


// Initialize the database and create the foods table, if it doesn't exist
export async function initDatabase() {

  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS foods (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      image TEXT,
      calories INTEGER,
      protein REAL, -- Real is a floating-point type
      carbs REAL,
      fat REAL,
      isFavorite INTEGER DEFAULT 0 -- 1 for true, 0 for false
    );
  `);
}