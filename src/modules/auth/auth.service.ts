import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const AuthService = {
    signupUser: async (payload: Record<string, unknown>) => {
        const { name, email, password, phone, role } = payload;

        const hashedPassword = await bcrypt.hash(password as string, 10);

        const res = await pool.query(
            `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [name, email, hashedPassword, phone, role]
        );

        return res;
    }
};

export default AuthService;