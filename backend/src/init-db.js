import { getDB, runQuery, allQuery } from './db.js';

export const initializeDatabase = async () => {
  try {
    // Create tables
    await runQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      )
    `);

    await runQuery(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        time_minutes INTEGER NOT NULL,
        price TEXT NOT NULL,
        link TEXT,
        description TEXT,
        image TEXT
      )
    `);

    await runQuery(`
      CREATE TABLE IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `);

    await runQuery(`
      CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `);

    await runQuery(`
      CREATE TABLE IF NOT EXISTS recipe_ingredients (
        recipe_id INTEGER,
        ingredient_id INTEGER,
        amount TEXT,
        unit TEXT,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
      )
    `);

    await runQuery(`
      CREATE TABLE IF NOT EXISTS recipe_tags (
        recipe_id INTEGER,
        tag_id INTEGER,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (tag_id) REFERENCES tags(id)
      )
    `);

    // Check if data already exists
    const recipes = await allQuery('SELECT COUNT(*) as count FROM recipes');
    if (recipes[0].count === 0) {
      // Seed ingredients
      const ingredientNames = [
        'Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper', 'Salt',
        'Chicken Breast', 'Breadcrumbs', 'Mozzarella Cheese', 'Tomato Sauce', 'Olive Oil',
        'Garlic', 'Penne Pasta', 'Bell Peppers', 'Zucchini', 'Cherry Tomatoes', 'Basil',
        'Butter', 'Flour', 'Salmon Fillet', 'Lemon', 'Dill'
      ];

      const ingredientIds = {};
      for (const name of ingredientNames) {
        const result = await runQuery('INSERT INTO ingredients (name) VALUES (?)', [name]);
        ingredientIds[name] = result.id;
      }

      // Seed tags
      const tagNames = ['Italian', 'Quick', 'Dinner', 'Vegetarian', 'Healthy', 'Seafood'];
      const tagIds = {};
      for (const name of tagNames) {
        const result = await runQuery('INSERT INTO tags (name) VALUES (?)', [name]);
        tagIds[name] = result.id;
      }

      // Seed recipes
      const recipes = [
        {
          title: 'Spaghetti Carbonara',
          time_minutes: 25,
          price: '12.50',
          link: 'http://example.com/carbonara',
          description: 'Classic Italian pasta with eggs, pancetta, and cheese'
        },
        {
          title: 'Chicken Parmesan',
          time_minutes: 50,
          price: '18.00',
          link: 'http://example.com/chicken-parm',
          description: 'Crispy breaded chicken topped with mozzarella and tomato sauce'
        },
        {
          title: 'Pasta Primavera',
          time_minutes: 30,
          price: '10.00',
          link: 'http://example.com/primavera',
          description: 'Light pasta with fresh seasonal vegetables'
        },
        {
          title: 'Garlic Butter Salmon',
          time_minutes: 20,
          price: '22.00',
          link: 'http://example.com/salmon',
          description: 'Pan-seared salmon with garlic butter and lemon sauce'
        }
      ];

      for (const recipe of recipes) {
        const result = await runQuery(
          'INSERT INTO recipes (title, time_minutes, price, link, description) VALUES (?, ?, ?, ?, ?)',
          [recipe.title, recipe.time_minutes, recipe.price, recipe.link, recipe.description]
        );
        recipe.id = result.id;
      }

      console.log('Database initialized with seed data');
    } else {
      console.log('Database already contains data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
