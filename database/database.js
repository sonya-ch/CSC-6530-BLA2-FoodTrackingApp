import * as SQLite from 'expo-sqlite';

import {foodData} from '../data/food.js'

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
      category TEXT NOT NULL,
      calories INTEGER,
      protein REAL, -- Real is a floating-point type
      carbs REAL,
      fat REAL,
      image TEXT,
      isFavorite INTEGER DEFAULT 0 -- 1 for true, 0 for false
    );
  `);
}


// Seeding data into the foods table
export async function seedFoods() {

  // Initialize the database and create the foods table, if it doesn't exist
  const db = await getDatabase();

  // Check if the foods table is already seeded 
  const result = await db.getFirstAsync(
    'SELECT COUNT(*) as count FROM foods'
  );

  // if the table is already seeded, return
  if (result.count > 0) {
    return;
  }
  // Seed the foods table with initial data
  for (const food of foodData) {
    await db.runAsync(
      `
      INSERT INTO foods
      (id, name, category, calories, protein, carbs, fat, image, isFavorite)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      food.id,
      food.name,
      food.category,
      food.calories,
      food.protein,
      food.carbs,
      food.fat,
      food.image,
      0
    );
  }
}

// Show all foods
export async function getFoods() {
  const db = await getDatabase();

  const foods = await db.getAllAsync(
    "SELECT * FROM foods ORDER BY id"
  );

  return foods;
}