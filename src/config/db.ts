import pg, { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: `${config.db_connection_str}`
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

    await pool.query(`
                CREATE TABLE IF NOT EXISTS vehicles(
                    id SERIAL PRIMARY KEY,
                    vehicle_name TEXT NOT NULL,
                    type TEXT NOT NULL,
                    registration_number TEXT NOT NULL UNIQUE,
                    daily_rent_price INT NOT NULL,
                    availability_status TEXT NOT NULL,
                    CONSTRAINT vehicle_type CHECK (type IN ('car', 'bike', 'van', 'SUV')),
                    CONSTRAINT daily_rent_price_positive CHECK (daily_rent_price > 0),
                    CONSTRAINT vehicle_availability_status CHECK (availability_status IN ('available', 'booked'))
                )
            `);
};

export default initDB;