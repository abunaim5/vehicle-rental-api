import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";

const BookingService = {
    createBooking: async (payload: Record<string, unknown>) => {
        const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

        const vehicleRes = await pool.query(
            `SELECT vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id = $1`,
            [vehicle_id]
        );

        if (!vehicleRes.rows.length) {
            return { vehicleRes };
        };

        if (vehicleRes.rows[0].availability_status === 'booked') {
            return { vehicleRes }
        }

        const startDate = new Date(rent_start_date as string);
        const endDate = new Date(rent_end_date as string);
        const number_of_days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        const total_price = vehicleRes.rows[0].daily_rent_price * number_of_days;

        const res = await pool.query(
            `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
        );

        if (res.rows.length) {
            await pool.query(
                `UPDATE vehicles SET availability_status = $1 WHERE id = $2`,
                ["booked", vehicle_id]
            );
        }

        return { vehicleRes, res };
    },

    getBookings: async ({ id: userId, role }: JwtPayload) => {
        

        const { rows: bookings } = await pool.query(
            role === 'admin' ? `SELECT * FROM bookings` : `SELECT * FROM bookings WHERE customer_id = $1`,
            role === 'admin' ? [] : [userId]
        );

        if (!bookings.length) return [];

        const { rows: users } = await pool.query(`SELECT id, name, email, role FROM users`);

        const { rows: vehicles } = await pool.query(`SELECT id, vehicle_name, registration_number, type FROM vehicles`);

        const bookingsRes = bookings.map(booking => {
            const user = users.find(user => user.id === booking.customer_id) || null;
            const vehicle = vehicles.find(vehicle => vehicle.id === booking.vehicle_id) || null;

            if (role === 'admin') {
                return {
                    ...booking,
                    customer: user ? { name: user.name, email: user.email } : null,
                    vehicle: vehicle ? {
                        vehicle_name: vehicle.vehicle_name,
                        registration_number: vehicle.registration_number
                    } : null
                }
            }

            return {
                ...booking,
                vehicle: vehicle ? {
                    vehicle_name: vehicle.vehicle_name,
                    registration_number: vehicle.registration_number,
                    type: vehicle.type
                } : null
            }
        });

        return bookingsRes;
    },

    updateBooking: async (payload: Record<string, unknown>, user: JwtPayload, bookingId: string) => {
        const { status } = payload;

        const bookingRes = await pool.query(
            `SELECT rent_start_date, vehicle_id FROM bookings WHERE id = $1`,
            [bookingId]
        );
        const booking = bookingRes.rows[0];
        if (!booking) return null;

        const rentStartDate = booking.rent_start_date;

        if (user.role === 'customer') {
            const currentDate = new Date();
            if (currentDate.getTime() > rentStartDate.getTime()) {
                return null;
            }
        }

        const updatedRes = await pool.query(
            `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
            [status, bookingId]
        );


        const updatedBooking = updatedRes.rows[0];
        if (!updatedBooking) return null;

        await pool.query(
            `UPDATE vehicles SET availability_status = $1 WHERE id = $2`,
            ["available", booking.vehicle_id]
        );

        if (status === 'returned') {
            return {
                ...updatedBooking,
                vehicle: {
                    availability_status: 'available'
                }
            }
        }

        return updatedBooking;
    }
};

export default BookingService;