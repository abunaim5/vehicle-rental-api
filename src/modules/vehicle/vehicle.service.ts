import { pool } from "../../config/db";

const VehicleService = {
    createVehicle: async (payload: Record<string, unknown>) => {
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
        const res = await pool.query(
            `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [vehicle_name, type, registration_number, daily_rent_price, availability_status]
        );

        return res;
    },

    getVehicles: async () => {
        const res = await pool.query(
            `SELECT * FROM vehicles`
        );

        return res;
    },

    getSingleVehicle: async (vehicleId: string) => {
        const res = await pool.query(
            `SELECT * FROM vehicles WHERE id = $1`,
            [vehicleId]
        );

        return res;
    },

    updateVehicle: async (payload: Record<string, unknown>, vehicleId: string) => {
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

        const res = await pool.query(
            `UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *`,
            [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]
        );

        return res;
    },

    deleteVehicle: async (vehicleId: string) => {
        const res = await pool.query(
            `DELETE FROM vehicles WHERE id = $1`,
            [vehicleId]
        );

        return res;
    }
};

export default VehicleService;