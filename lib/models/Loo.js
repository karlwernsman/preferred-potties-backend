const pool = require('../utils/pool');

module.exports = class Loo {
  id;
  location;
  description;
  rating;
  review_id;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.location = row.location;
    this.description = row.description;
    this.rating = row.rating;
    this.review_id = row.review_id;
    this.created_at = row.created_at;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from loos');
    return rows.map((row) => new Loo(row));
  }

  // static async insert({ location, description, rating }) {
  //   const { rows } = await pool.query(
  //     `
  //       INSERT INTO loos (location, description, rating)
  //       VALUES ($1, $2, $3)
  //       RETURNING *
  //       `,
  //     [location, description, rating]
  //   );
  //   return new Loo(rows[0]);
  // }
};
