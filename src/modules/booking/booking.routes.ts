import express from "express";
import BookingController from "./booking.controller";

const router = express.Router();

router
    .post('/', BookingController.createBooking)
    .get('/', BookingController.getBookings)
    .put('/:bookingId', BookingController.updateBooking);

export const bookingRoutes = router;