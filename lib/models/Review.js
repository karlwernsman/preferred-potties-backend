const pool = require('../utils/pool');

module.exports = class Review {
  id;
  created_at;
  cleanliness;
  safety;
  accessibility;
  gendered;
  locks;
  sanitizer;
  amenities;
  comments;

  constructor(row) {
    this.id = row.id;
    this.created_at = row.created_at;
    this.cleanliness = row.cleanliness;
    this.safety = row.safety;
    this.accessibility = row.accessibility;
    this.gendered = row.gendered;
    this.locks = row.locks;
    this.sanitizer = row.sanitizer;
    this.amenities = row.amenities;
    this.comments = row.comments;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT *  from reviews');
    return rows.map((row) => new Review(row));
  }

  static async insert({ cleanliness, accessibility, safety, gendered, locks, sanitizer, amenities, comments }) {
    const { rows } = await pool.query(
      `
      INSERT INTO reviews (cleanliness, accessibility, safety, gendered, locks, sanitizer, amenities, comments)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [cleanliness, accessibility, safety, gendered, locks, sanitizer, amenities, comments]
    );
    return new Review(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from reviews
      WHERE id = $1`,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Review(rows[0]);
  }
};
