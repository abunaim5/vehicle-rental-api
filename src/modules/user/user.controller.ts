import { Request, Response } from "express";
import UserService from "./user.service";
import { UserType } from "./user.interface";

const UserController = {
    getUsers: async (_: Request, res: Response) => {
        try {
            const result = await UserService.getUsers();

            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: result.rows as UserType[]
            })
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        };
    }
};

export default UserController;