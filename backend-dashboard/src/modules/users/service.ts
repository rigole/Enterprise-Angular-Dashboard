import { db } from "../../config/database";
import {  User } from "../models/users";

export class UserService {
    
    async getAllUsers(): Promise<User[]> {
       const result = await db.query<User>(
      `SELECT id, email, role, created_at
       FROM users
       ORDER BY created_at DESC`
    );
        return result.rows;
    }

}