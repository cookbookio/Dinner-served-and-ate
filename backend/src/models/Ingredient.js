import { getQuery, allQuery, runQuery } from '../db.js';

export class Ingredient {
  static async create(name) {
    const result = await runQuery(
      'INSERT INTO ingredients (name) VALUES (?)',
      [name]
    );
    return this.getById(result.id);
  }

  static async getById(id) {
    return await getQuery('SELECT id, name FROM ingredients WHERE id = ?', [id]);
  }

  static async getAll() {
    return await allQuery('SELECT id, name FROM ingredients');
  }

  static async getByName(name) {
    return await getQuery('SELECT id, name FROM ingredients WHERE name = ?', [name]);
  }

  static async update(id, name) {
    await runQuery('UPDATE ingredients SET name = ? WHERE id = ?', [name, id]);
    return this.getById(id);
  }

  static async delete(id) {
    await runQuery('DELETE FROM recipe_ingredients WHERE ingredient_id = ?', [id]);
    await runQuery('DELETE FROM ingredients WHERE id = ?', [id]);
  }
}
