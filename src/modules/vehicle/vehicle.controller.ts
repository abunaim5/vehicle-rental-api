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
    },

    getVehicles: async (_: Request, res: Response) => {
        try {
            const result = await VehicleService.getVehicles();

            res.status(200).json({
                success: true,
                message: !result.rows.length ? "No vehicles found" : "Vehicles retrieved successfully",
                data: result.rows
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    getSingleVehicle: async (req: Request, res: Response) => {
        const vehicleId = req.params.vehicleId;

        try {
            const result = await VehicleService.getSingleVehicle(vehicleId as string);

            if (!result.rows.length) {
                res.status(404).json({
                    success: false,
                    message: "Vehicle Not Found",
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Vehicle retrieved successfully",
                    data: result.rows[0]
                });
            }

        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    updateVehicle: async (req: Request, res: Response) => {
        const vehicleId = req.params.vehicleId;

        try {
            const result = await VehicleService.updateVehicle(req.body, vehicleId as string);

            if (!result) {
                res.status(200).json({
                    success: true,
                    message: "Nothing to update"
                });
            } else if (!result.rows.length) {
                res.status(404).json({
                    success: false,
                    message: "Vehicle Not Found"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Vehicle updated successfully",
                    data: result.rows[0]
                });
            }
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    deleteVehicle: async (req: Request, res: Response) => {
        const vehicleId = req.params.vehicleId;

        try {
            const result = await VehicleService.deleteVehicle(vehicleId as string);

            if (!result) {
                res.status(409).json({
                    success: false,
                    message: "Cannot delete vehicle with active bookings",
                    error: "Active booking exist"
                });
            } else if (!result.rowCount) {
                res.status(404).json({
                    success: false,
                    message: "Vehicle Not Found"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Vehicle deleted successfully"
                });
            }
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
};

export default VehicleController;