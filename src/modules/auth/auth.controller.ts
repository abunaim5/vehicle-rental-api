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
};

export default AuthController;