import express from "express";
import UserController from "./user.controller";

const router = express.Router();

router
    .get('/', UserController.getUsers)
    .put('/:userId', UserController.updateUser)
    .delete('/:userId', UserController.deleteUser);

export const userRoutes = router;