import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/user/user.routes";
const app = express();

// middleware (json parser)
app.use(express.json());

// initializing database
initDB();

// users apis
app.use('/api/v1/users', userRoutes);

app.get('/', (_: Request, res: Response) => {
    res.send('Vehicle Rental Server API is Running!');
});

export default app;