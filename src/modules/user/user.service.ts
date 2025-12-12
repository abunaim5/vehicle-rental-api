import { pool } from "../../config/db"

const UserService = {
    getUsers: async () => {
        const res = await pool.query(
            `SELECT id, name, email, phone, role FROM users`
        );

        return res;
    },

    updateUser: async (payload: Record<string, unknown>, userId: string) => {
        const fields: string[] = [];
        const values: unknown[] = [];
        let idx = 1;

        for (const key in payload) {
            fields.push(`${key} = $${idx}`);
            values.push(payload[key]);
            idx++;
        };

        values.push(userId);

        const res = await pool.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, name, email, phone, role, created_at, updated_at`,
            values
        );

        return res;
    },

    deleteUser: async (userId: string) => {
        const bookingRes = await pool.query(`SELECT customer_id FROM bookings`);
        const customerIds = new Set(bookingRes.rows.map(booking => booking.customer_id));
        // console.log(customerIds, customerIds.has(parseInt(userId)));

        if (customerIds.has(parseInt(userId))) {
            return null;
        }

        const res = await pool.query(
            `DELETE FROM users WHERE id = $1`,
            [userId]
        );

        return res;
    }
};

export default UserService;