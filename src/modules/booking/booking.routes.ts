import express from "express";
import BookingController from "./booking.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router
    .post('/', auth('admin', 'customer'), BookingController.createBooking)
    .get('/', auth('admin', 'customer'), BookingController.getBookings)
    .put('/:bookingId', auth('admin', 'customer'), BookingController.updateBooking);

export const bookingRoutes = router;