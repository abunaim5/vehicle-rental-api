import { Request, Response } from "express";
import VehicleService from "./vehicle.service";

const VehicleController = {
    createVehicle: async (req: Request, res: Response) => {
        try {
            const result = await VehicleService.createVehicle(req.body);

            res.status(201).json({
                success: true,
                message: "Vehicle created successfully",
                data: result.rows[0]
            })
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
};

export default VehicleController;