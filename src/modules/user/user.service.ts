import { pool } from "../../config/db"

const UserService = {
    getUsers: async () => {
        const res = await pool.query(
            `SELECT * FROM users`
        );

        return res;
    }
};

export default UserService;