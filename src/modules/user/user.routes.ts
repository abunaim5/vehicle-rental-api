import express from "express";
import UserController from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router
    .get('/', auth('admin'), UserController.getUsers)
    .put('/:userId', auth('admin', 'customer'), UserController.updateUser)
    .delete('/:userId', auth('admin'), UserController.deleteUser);

export const userRoutes = router;