import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();
export const env = {
  dbHost: process.env.DB_HOST!,
  dbPort: Number(process.env.DB_PORT),
  dbUser: process.env.DB_USER!,
  dbPassword: process.env.DB_PASSWORD!,
  dbName: process.env.DB_NAME!
};

console.log(env);