
import express from 'express';
import { db } from './config/database';
import { createUser, getAllUsers } from './modules/users/controllers';
import { login, signup } from './modules/auth/controller';
import { authMiddleware } from './middlewares/authmiddleware';
import { getUserById } from './modules/users/controllers';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', async (_req, res) => {
  const result = await db.query('SELECT NOW()');
  res.json({ status: 'ok', time: result.rows[0] });
});

app.get('/employees', getAllUsers);
app.post('/login', login);
app.post('/signup', signup);
app.post('/add/employee', createUser);
app.get('/employees/:id', authMiddleware, getUserById);

app.listen(3000, () => {
  console.log(' Server running on http://localhost:3000');
});