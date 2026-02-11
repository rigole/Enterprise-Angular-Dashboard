import { log } from "node:console";
import { db } from "../../config/database";
import {  Employee } from "../models/users";

export class UserService {
    
    async getAllUsers(): Promise<Employee[]> {
       const result = await db.query<Employee>(
      `SELECT first_name, last_name, work_anniversary,date_of_birth,profession,phone_number, email, role, created_at 
       FROM users
       ORDER BY created_at DESC`
    );
        return result.rows;
    }

    async getUserById(id: string): Promise<Employee | null> {
        const result = await db.query<Employee>(
            `SELECT first_name, last_name, work_anniversary,date_of_birth,profession,phone_number, email, role, created_at
            FROM users
            WHERE id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }

    async createUser(employee: Employee): Promise<Employee> {
        const result = await db.query<Employee>(
            `INSERT INTO users (first_name, last_name, work_anniversary,date_of_birth,profession,phone_number, email, role, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
            [employee.first_name, employee.last_name, employee.work_anniversary, employee.date_of_birth, employee.profession, employee.phone_number, employee.email, employee.role, new Date()]
        );
        return result.rows[0];
    }

}