import pg, { Pool } from "pg";
import config from ".";

const pool = new Pool({
    connectionString: config.db_connection_str
});

const initDB = async () => {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password TEXT NOT NULL,
                phone VARCHAR(20) NOT NULL,
                role VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW(),
                CONSTRAINT email_lowercase CHECK (email = LOWER(email)),
                CONSTRAINT password_min_length CHECK (LENGTH(password) >= 6)
            )
        `);
};

export default initDB;