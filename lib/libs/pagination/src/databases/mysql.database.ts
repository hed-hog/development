import { AbstractDatabase } from './abstract.database';
import { Database } from './database';

export class MySQLDatabase extends AbstractDatabase {
  constructor(
    protected host: string,
    protected user: string,
    protected password: string,
    protected database: string,
    protected port: number,
  ) {
    super(Database.MYSQL, host, user, password, database, port);
  }
}
