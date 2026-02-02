import express from 'express';
import { runQuery, allQuery, getQuery } from '../db.js';

const router = express.Router();

// Recipes CRUD
router.get('/recipes/', async (req, res) => {
  console.log('Route invoked: GET /api/recipe/recipes/');
  try {
    const recipes = await allQuery('SELECT id, title, time_minutes, price, link FROM recipes');
    
    const result = [];
    for (const recipe of recipes) {
      const ingredients = await allQuery(`
        SELECT i.id, i.name, ri.amount, ri.unit FROM ingredients i
        JOIN recipe_ingredients ri ON i.id = ri.ingredient_id
        WHERE ri.recipe_id = ?
      `, [recipe.id]);
      
      const tags = await allQuery(`
        SELECT t.id, t.name FROM tags t
        JOIN recipe_tags rt ON t.id = rt.tag_id
        WHERE rt.recipe_id = ?
      `, [recipe.id]);
      
      result.push({
        ...recipe,
        ingredients,
        tags
      });
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/recipes/', (req, res) => {
  console.log('Route invoked: POST /api/recipe/recipes/');
  const { title, time_minutes, price, link, tags, ingredients, description } = req.body;
  
  res.status(201).json({
    id: 1,
    title,
    time_minutes,
    price,
    link: link || '',
    tags: tags || [],
    ingredients: ingredients || [],
    description: description || ''
  });
});

router.get('/recipes/:id/', async (req, res) => {
  console.log('Route invoked: GET /api/recipe/recipes/:id/');
  try {
    const { id } = req.params;
    
    const recipe = await getQuery(
      'SELECT id, title, time_minutes, price, link, description FROM recipes WHERE id = ?',
      [id]
    );
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    const ingredients = await allQuery(`
      SELECT i.id, i.name, ri.amount, ri.unit FROM ingredients i
      JOIN recipe_ingredients ri ON i.id = ri.ingredient_id
      WHERE ri.recipe_id = ?
    `, [id]);
    
    const tags = await allQuery(`
      SELECT t.id, t.name FROM tags t
      JOIN recipe_tags rt ON t.id = rt.tag_id
      WHERE rt.recipe_id = ?
    `, [id]);
    
    res.status(200).json({
      ...recipe,
      ingredients,
      tags
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/recipes/:id/', (req, res) => {
  console.log('Route invoked: PUT /api/recipe/recipes/:id/');
  const { id } = req.params;
  const { title, time_minutes, price, link, tags, ingredients, description } = req.body;
  
  res.status(200).json({
    id: parseInt(id),
    title,
    time_minutes,
    price,
    link: link || '',
    tags: tags || [],
    ingredients: ingredients || [],
    description: description || ''
  });
});

router.patch('/recipes/:id/', (req, res) => {
  console.log('Route invoked: PATCH /api/recipe/recipes/:id/');
  const { id } = req.params;
  const { title, time_minutes, price, link, tags, ingredients, description } = req.body;
  
  res.status(200).json({
    id: parseInt(id),
    title: title || 'Sample Recipe',
    time_minutes: time_minutes || 30,
    price: price || '10.00',
    link: link || '',
    tags: tags || [],
    ingredients: ingredients || [],
    description: description || ''
  });
});

router.delete('/recipes/:id/', (req, res) => {
  console.log('Route invoked: DELETE /api/recipe/recipes/:id/');
  res.status(204).send();
});

router.post('/recipes/:id/upload-image/', (req, res) => {
  console.log('Route invoked: POST /api/recipe/recipes/:id/upload-image/');
  const { id } = req.params;
  
  res.status(200).json({
    id: parseInt(id),
    image: 'http://example.com/image.jpg'
  });
});

// Ingredients CRUD
router.get('/ingredients/', async (req, res) => {
  console.log('Route invoked: GET /api/recipe/ingredients/');
  try {
    const ingredients = await allQuery('SELECT id, name FROM ingredients');
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/ingredients/:id/', (req, res) => {
  console.log('Route invoked: PUT /api/recipe/ingredients/:id/');
  const { id } = req.params;
  const { name } = req.body;
  
  res.status(200).json({
    id: parseInt(id),
    name
  });
});

router.patch('/ingredients/:id/', (req, res) => {
  console.log('Route invoked: PATCH /api/recipe/ingredients/:id/');
  const { id } = req.params;
  const { name } = req.body;
  
  res.status(200).json({
    id: parseInt(id),
    name: name || 'Sample Ingredient'
  });
});

router.delete('/ingredients/:id/', (req, res) => {
  console.log('Route invoked: DELETE /api/recipe/ingredients/:id/');
  res.status(204).send();
});

// Tags CRUD
router.get('/tags/', async (req, res) => {
  console.log('Route invoked: GET /api/recipe/tags/');
  try {
    const tags = await allQuery('SELECT id, name FROM tags');
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/tags/:id/', (req, res) => {
  console.log('Route invoked: PUT /api/recipe/tags/:id/');
  const { id } = req.params;
  const { name } = req.body;
  
  res.status(200).json({
    id: parseInt(id),
    name
  });
});

router.patch('/tags/:id/', (req, res) => {
  console.log('Route invoked: PATCH /api/recipe/tags/:id/');
  const { id } = req.params;
  const { name } = req.body;
  
  res.status(200).json({
    id: parseInt(id),
    name: name || 'Sample Tag'
  });
});

router.delete('/tags/:id/', (req, res) => {
  console.log('Route invoked: DELETE /api/recipe/tags/:id/');
  res.status(204).send();
});

export default router;
