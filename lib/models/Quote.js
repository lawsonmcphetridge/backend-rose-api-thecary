const pool = require('../utils/pool');

class Quote {
  id;
  detail;
  character_id;
  episode_id;
  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.character_id = row.character_id;
    this.episode_id = row.episode_id;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM quotes');
    return Number(rows[0].count);
  }

  static async insert({ character_id, episode_id, detail }) {
    const { rows } = await pool.query(`
    INSERT into quotes (character_id, episode_id, detail)
    values($1, $2, $3)
    RETURNING *

    `, [character_id, episode_id, detail]
    );
    return new Quote(rows[0]);
  }
}

module.exports = { Quote };
