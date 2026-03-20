import crypto from "crypto";
import { db } from "../../config/database";
import { Employee } from "../models/users";
import bcrypt from "bcrypt";

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
        const activation_token = crypto.randomUUID();
        const result = await db.query<Employee>(
            `INSERT INTO employees (first_name, last_name, hiring_date,date_of_birth,profession,phone_number, email, role, created_at,password, activation_token)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11)
            RETURNING *`,
            [employee.firstName, employee.lastName, employee.hiringDate, employee.dateOfBirth, employee.profession, employee.phone, employee.email, "employee", new Date(), "", activation_token]
        );
        console.log("results", result.rows[0]);
        return result.rows[0];
    }

    async setEmployeePassword(token: string, password: string) {
        console.log("token service", token);
        console.log("password service", password);
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query<Employee>(
            `UPDATE employees
            SET password = $1
            WHERE activation_token = $2
            RETURNING *`,
            [hashedPassword, token]
        ); 
        return result.rows[0];
    
    }

}