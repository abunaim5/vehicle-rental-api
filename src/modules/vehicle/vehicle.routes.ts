import express from "express";
import VehicleController from "./vehicle.controller";

const router = express.Router();

router
    .post('/', VehicleController.createVehicle)
    .get('/', VehicleController.getVehicles)
    .get('/:vehicleId', VehicleController.getSingleVehicle)
    .put('/:vehicleId', VehicleController.updateVehicle)

export const vehicleRoutes = router;