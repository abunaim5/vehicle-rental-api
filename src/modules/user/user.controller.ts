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
    },

    updateUser: async (req: Request, res: Response) => {
        const userId = req.params.userId;

        try {
            const result = await UserService.updateUser(req.body, userId as string);

            if (!result.rows.length) {
                res.status(404).json({
                    success: false,
                    message: "User Not Found"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    data: result.rows[0]
                });
            }
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        const userId = req.params.userId;

        try {
            const result = await UserService.deleteUser(userId as string);

            if (!result.rowCount) {
                res.status(404).json({
                    success: false,
                    message: "User Not Found"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "User deleted successfully"
                });
            }
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
};

export default UserController;