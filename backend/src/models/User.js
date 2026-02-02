import { getQuery, allQuery, runQuery } from '../db.js';

export class User {
  static async create(email, password, name) {
    const result = await runQuery(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, password, name]
    );
    return this.getById(result.id);
  }

  static async getById(id) {
    return await getQuery('SELECT id, email, name FROM users WHERE id = ?', [id]);
  }

  static async getByEmail(email) {
    return await getQuery('SELECT id, email, name FROM users WHERE email = ?', [email]);
  }

  static async getAll() {
    return await allQuery('SELECT id, email, name FROM users');
  }

  static async update(id, { email, name, password }) {
    let sql = 'UPDATE users SET ';
    const params = [];
    const updates = [];

    if (email !== undefined) {
      updates.push('email = ?');
      params.push(email);
    }
    if (name !== undefined) {
      updates.push('name = ?');
      params.push(name);
    }
    if (password !== undefined) {
      updates.push('password = ?');
      params.push(password);
    }

    if (updates.length === 0) return null;

    sql += updates.join(', ') + ' WHERE id = ?';
    params.push(id);

    await runQuery(sql, params);
    return this.getById(id);
  }

  static async delete(id) {
    await runQuery('DELETE FROM users WHERE id = ?', [id]);
  }
}
