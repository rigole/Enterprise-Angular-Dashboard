import { AuthService } from "./service";
import { Request, Response } from "express";

const authService = new AuthService();


export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authService.signup({ email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Signup failed' });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login( email, password );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Login failed' });
  }
};
