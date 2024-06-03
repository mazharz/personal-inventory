import { Pool } from 'pg';

class DatabaseService {
  pool: Pool;

  constructor() {
    this.pool = new Pool();
  }

  async query<T>(sql: string, values?: unknown[]): Promise<T> {
    const res = await this.pool.query(sql, values);
    return res.rows as T;
  }
}

export { DatabaseService };
