import express, { Request, Response } from "express";
const app = express();

app.use(express.json());

app.get('/', (_: Request, res: Response) => {
    res.send('Vehicle Rental Server API is Running!');
});

export default app;