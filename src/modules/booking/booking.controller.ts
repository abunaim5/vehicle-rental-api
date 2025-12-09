import { Request, Response } from "express";
import BookingService from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const BookingController = {
    createBooking: async (req: Request, res: Response) => {
        try {
            const { res: createRes, vehicleRes } = await BookingService.createBooking(req.body);

            if (!vehicleRes?.rows.length) {
                res.status(404).json({
                    success: false,
                    message: 'Vehicle Not Found'
                });
            } else {
                res.status(201).json({
                    success: true,
                    message: "Booking created successfully",
                    data: {
                        ...createRes?.rows[0],
                        vehicle: {
                            ...vehicleRes?.rows[0]
                        }
                    }
                });
            }
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    getBookings: async (req: Request, res: Response) => {
        const user = req?.user;
        console.log(user);

        try {
            const result = await BookingService.getBookings(user as JwtPayload);

            res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                data: result
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    updateBooking: async (req: Request, res: Response) => {
        const bookingId = req.params.bookingId;

        try {
            const result = await BookingService.updateBooking(req.body, bookingId as string);

            if (!result) {
                res.status(404).json({
                    success: false,
                    message: "Booking Not Found"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: result.status === 'cancelled' ? 'Booking cancelled successfully' : 'Booking marked as returned. Vehicle is now available',
                    data: result
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

export default BookingController;