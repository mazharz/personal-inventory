import { Pool } from 'pg';

class DatabaseService {
  pool: Pool;

  constructor() {
    this.pool = new Pool();
  }

  async query(sql: string, values?: unknown[]) {
    const res = await this.pool.query(sql, values);
    return res.rows;
  }
}

export { DatabaseService };
