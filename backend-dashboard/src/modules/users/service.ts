import { log } from "node:console";
import { db } from "../../config/database";
import { Employee } from "../models/users";

export class UserService {

    async getAllUsers(): Promise<Employee[]> {
        const result = await db.query<Employee>(
            `SELECT first_name, last_name, hiring_date,date_of_birth,profession,phone_number, email, role, created_at 
       FROM employees
       ORDER BY created_at DESC`
        );
        return result.rows;
    }

    async getUserById(id: string): Promise<Employee | null> {
        const result = await db.query<Employee>(
            `SELECT first_name, last_name, hiring_date,date_of_birth,profession,phone_number, email, role, created_at
            FROM users
            WHERE id = $1`,
            [id]
        );
        return result.rows[0] || null;
    }

    async createUser(employee: Employee): Promise<Employee> {
        const result = await db.query<Employee>(
            `INSERT INTO employees (first_name, last_name, hiring_date,date_of_birth,profession,phone_number, email, role, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
            [employee.firstName, employee.lastName, employee.hiringDate, employee.dateOfBirth, employee.profession, employee.phone, employee.email, "employee"  , new Date()]
        );
        return result.rows[0];
    }

}