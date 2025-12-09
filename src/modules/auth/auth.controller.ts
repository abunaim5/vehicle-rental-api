import { Request, Response } from "express";
import AuthService from "./auth.service";
import { UserType } from "../user/user.interface";

const AuthController = {
    signupUser: async (req: Request, res: Response) => {
        try {
            const result = await AuthService.signupUser(req.body);

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: result.rows[0] as UserType
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        };
    },

    signinUser: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const result = await AuthService.signinUser(email, password);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
};

export default AuthController;