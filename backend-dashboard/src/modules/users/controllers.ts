import { Request, Response } from "express";
import { UserService } from "./service";
import { Jwt } from "jsonwebtoken";
import { env } from "../../config/env";
const userService = new UserService();
import jwt from 'jsonwebtoken';


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById((id as string));
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const employee = req.body;
        const result = await userService.createUser(employee);
        const activationToken = result.activation_token;
        res.status(201).json({
            result: result,
            token: activationToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const setEmployeePassword = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;
         const result = await userService.setEmployeePassword(token, password);
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Password set successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}