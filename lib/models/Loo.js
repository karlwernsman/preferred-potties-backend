const pool = require('../utils/pool');

module.exports = class Loo {
  id;
  // location;
  description;
  rating;
  created_at;

  constructor(row) {
    this.id = row.id;
    // this.location = row.location;
    this.description = row.description;
    this.rating = row.rating;
    this.created_at = row.created_at;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from loos');
    return rows.map((row) => new Loo(row));
  }

  static async insert({ description, rating }) {
    const { rows } = await pool.query(
      `
        INSERT INTO loos (description, rating)
        VALUES ($1, $2)
        RETURNING *
        `,
      [description, rating]
    );
    return new Loo(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from loos
      WHERE id = $1
      `,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Loo(rows[0]);
  }

  static async updateById(id, attrs) {
    const loo = await Loo.getById(id);
    if (!loo) return null;
    const { description, rating } = { ...loo, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE loos
      SET description=$2, rating=$3
      WHERE id=$1
      RETURNING *
      
      `,
      [id, description, rating]
    );
    return new Loo(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from loos
      WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Loo(rows[0]);
  }
};
