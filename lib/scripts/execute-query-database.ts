export async function executeQueryDatabase(
  type: 'postgres' | 'mysql',
  host: string,
  port: number,
  user: string,
  password: string,
  database: string,
  query: string,
) {
  try {
    if (type === 'postgres') {
      const { Client } = await import('pg');
      const client = new Client({
        host,
        user,
        password,
        database,
        port,
      });
      await client.connect();
      const result = await client.query(query);
      await client.end();
      return result.rows;
    } else if (type === 'mysql') {
      const mysql = await import('mysql2/promise');
      const connection = await mysql.createConnection({
        host,
        user,
        password,
        database,
        port,
      });
      const result = await connection.query(query);
      await connection.end();
      return result[0];
    }
  } catch (error) {
    return false;
  }
  return true;
}
