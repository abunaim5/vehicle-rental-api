import config from "../../config";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AuthService = {
    signupUser: async (payload: Record<string, unknown>) => {
        const { name, email, password, phone, role } = payload;

        const hashedPassword = await bcrypt.hash(password as string, 10);

        const res = await pool.query(
            `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [name, email, hashedPassword, phone, role]
        );

        return res;
    },

    signinUser: async (email: string, password: string) => {
        const res = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        if (!res.rows.length) return null;

        const user = res.rows[0];

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) return false;

        const token = jwt.sign({id: user.id, name: user.name, email: user.email, role: user.role }, config.jwt_secret as string, {
            expiresIn: "7d"
        });

        return { token, user };
    }
};

export default AuthService;