import express, { Request, Response } from "express";
import initDB from "./config/db";
const app = express();

// middleware (json parser)
app.use(express.json());

// initializing database
initDB();

app.get('/', (_: Request, res: Response) => {
    res.send('Vehicle Rental Server API is Running!');
});

export default app;