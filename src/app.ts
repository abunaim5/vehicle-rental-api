import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";
import globalErrorHandler from "./middleware/errorHandler";
const app = express();

// middleware (json parser)
app.use(express.json());

// initializing database
initDB();

// auth related api
app.use('/api/v1/auth', authRoutes);

// users related api
app.use('/api/v1/users', userRoutes);

// vehicles related api
app.use('/api/v1/vehicles', vehicleRoutes);

// bookings related api
app.use('/api/v1/bookings', bookingRoutes);

app.get('/', (_: Request, res: Response) => {
    res.send('Vehicle Rental Server API is Running!');
});

app.use(globalErrorHandler); 

export default app;