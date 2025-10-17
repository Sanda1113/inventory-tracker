const db = require('../config/database');

class Inventory {
  static getAll(callback) {
    const query = 'SELECT * FROM inventory ORDER BY created_at DESC';
    db.query(query, callback);
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM inventory WHERE id = ?';
    db.query(query, [id], callback);
  }

  static create(item, callback) {
    const { name, category, quantity, price, description } = item;
    const query = 'INSERT INTO inventory (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, category, quantity, price, description], callback);
  }

  static update(id, item, callback) {
    const { name, category, quantity, price, description } = item;
    const query = 'UPDATE inventory SET name = ?, category = ?, quantity = ?, price = ?, description = ? WHERE id = ?';
    db.query(query, [name, category, quantity, price, description, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM inventory WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Inventory;