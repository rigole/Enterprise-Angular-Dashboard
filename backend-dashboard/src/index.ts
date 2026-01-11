
import express from 'express';
import { db } from './config/database';
import { getAllUsers } from './modules/users/controllers';

const app = express();
app.use(express.json());

app.get('/health', async (_req, res) => {
  const result = await db.query('SELECT NOW()');
  res.json({ status: 'ok', time: result.rows[0] });
});

app.get('/users', getAllUsers);

app.listen(3000, () => {
  console.log(' Server running on http://localhost:3000');
});