import { Pool } from 'pg';
import { env } from './env';


export const db = new Pool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName
});


db.on('connect', () => {
  console.log('Connected to PostgreSQL');
});