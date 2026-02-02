import { log } from "node:console";
import { db } from "../../config/database";
import {  User } from "../models/users";

export class UserService {
    
    async getAllUsers(): Promise<User[]> {
       const result = await db.query<User>(
      `SELECT first_name, last_name, work_anniversary,date_of_birth,profession,phone_number, email, role, created_at 
       FROM users
       ORDER BY created_at DESC`
    );
        return result.rows;
    }

    async getUserById(id: string): Promise<User | null> {
        const result = await db.query<User>(
            `SELECT first_name, last_name, work_anniversary,date_of_birth,profession,phone_number, email, role, created_at
            FROM users
            WHERE id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }

}