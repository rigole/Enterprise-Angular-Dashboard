import { Request, Response } from "express";
import { UserService } from "./service";

const userService = new UserService();


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