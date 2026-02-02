import { getQuery, allQuery, runQuery } from '../db.js';

export class Recipe {
  static async create(title, time_minutes, price, link, description) {
    const result = await runQuery(
      'INSERT INTO recipes (title, time_minutes, price, link, description) VALUES (?, ?, ?, ?, ?)',
      [title, time_minutes, price, link, description]
    );
    return this.getById(result.id);
  }

  static async getById(id) {
    return await getQuery('SELECT * FROM recipes WHERE id = ?', [id]);
  }

  static async getAll() {
    return await allQuery('SELECT * FROM recipes');
  }

  static async getWithDetails(id) {
    const recipe = await this.getById(id);
    if (!recipe) return null;

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

    return {
      ...recipe,
      ingredients,
      tags
    };
  }

  static async update(id, { title, time_minutes, price, link, description }) {
    let sql = 'UPDATE recipes SET ';
    const params = [];
    const updates = [];

    if (title !== undefined) {
      updates.push('title = ?');
      params.push(title);
    }
    if (time_minutes !== undefined) {
      updates.push('time_minutes = ?');
      params.push(time_minutes);
    }
    if (price !== undefined) {
      updates.push('price = ?');
      params.push(price);
    }
    if (link !== undefined) {
      updates.push('link = ?');
      params.push(link);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      params.push(description);
    }

    if (updates.length === 0) return null;

    sql += updates.join(', ') + ' WHERE id = ?';
    params.push(id);

    await runQuery(sql, params);
    return this.getById(id);
  }

  static async delete(id) {
    await runQuery('DELETE FROM recipe_ingredients WHERE recipe_id = ?', [id]);
    await runQuery('DELETE FROM recipe_tags WHERE recipe_id = ?', [id]);
    await runQuery('DELETE FROM recipes WHERE id = ?', [id]);
  }

  static async addIngredient(recipeId, ingredientId, amount, unit) {
    return await runQuery(
      'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount, unit) VALUES (?, ?, ?, ?)',
      [recipeId, ingredientId, amount, unit]
    );
  }

  static async addTag(recipeId, tagId) {
    return await runQuery(
      'INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (?, ?)',
      [recipeId, tagId]
    );
  }
}
