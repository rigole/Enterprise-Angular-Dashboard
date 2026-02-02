import { UserInput } from "../models/users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../../config/database";

export class AuthService {

    async signup(data: UserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await db.query(
      `INSERT INTO users (email, password, role)
       VALUES ($1, $2, 'USER')
       RETURNING id, email, role`,
      [data.email, hashedPassword]
    );

    return result.rows[0];
  }

  async login(email: string, password: string) {
    const user = await db.query(
      `SELECT *
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (!user.rows[0]) {
      throw new Error('User not found');
    }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);

  if (!isMatch) {
    throw new Error('Invalid password');
  }

    const token = jwt.sign(
      { userId: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET as string,
      { expiresIn:'1d' }
    );

    return {
      token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        role: user.rows[0].role
      }
    };
  }
  
}