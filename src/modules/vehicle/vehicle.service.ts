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
        const fields: string[] = [];
        const values: unknown[] = [];
        let idx = 1;

        if (!fields.length) return null;

        for (const key in payload) {
            fields.push(`${key} = $${idx}`);
            values.push(payload[key]);
            idx++;
        }

        values.push(vehicleId);

        const updatedRes = await pool.query(
            `UPDATE vehicles SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
            values
        );

        return updatedRes;
    },

    deleteVehicle: async (vehicleId: string) => {
        const vehicleRes = await pool.query(
            `SELECT availability_status FROM vehicles WHERE id = $1`,
            [vehicleId]
        );

        if (vehicleRes.rows[0].availability_status === 'booked') {
            return null;
        }

        const res = await pool.query(
            `DELETE FROM vehicles WHERE id = $1`,
            [vehicleId]
        );

        return res;
    }
};

export default VehicleService;