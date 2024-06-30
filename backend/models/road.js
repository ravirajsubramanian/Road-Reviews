const db = require('../db');

const Road = {
  async getAll() {
    const result = await db.query('SELECT * FROM roads');
    return result.rows;
  }
};

module.exports = Road;
