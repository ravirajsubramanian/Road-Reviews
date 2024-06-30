const db = require('../db');

const Review = {
  async create(roadId, rating, review) {
    const result = await db.query(
      'INSERT INTO reviews (road_id, rating, review) VALUES ($1, $2, $3) RETURNING *',
      [roadId, rating, review]
    );
    return result.rows[0];
  },

  async getAll(roadIds) {
    const result = await db.query('SELECT * FROM reviews WHERE road_id = ANY($1::int[])', [roadIds]);
    return result.rows;
  }
};

module.exports = Review;
