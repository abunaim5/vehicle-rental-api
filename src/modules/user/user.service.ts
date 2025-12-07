import { pool } from "../../config/db"

const UserService = {
    getUsers: async () => {
        const res = await pool.query(
            `SELECT * FROM users`
        );

        return res;
    },

    updateUser: async (payload: Record<string, unknown>, userId: string) => {
        const { name, email, phone, role } = payload;

        const res = await pool.query(
            `UPDATE users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING *`,
            [name, email, phone, role, userId]
        );

        return res;
    },

    deleteUser: async (userId: string) => {
        const res = await pool.query(
            `DELETE FROM users WHERE id = $1`,
            [userId]
        );

        return res;
    }
};

export default UserService;