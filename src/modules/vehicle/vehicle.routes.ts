import express from "express";
import VehicleController from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router
    .post('/', auth('admin'), VehicleController.createVehicle)
    .get('/', VehicleController.getVehicles)
    .get('/:vehicleId', VehicleController.getSingleVehicle)
    .put('/:vehicleId', auth('admin'), VehicleController.updateVehicle)
    .delete('/:vehicleId', auth('admin'), VehicleController.deleteVehicle);

export const vehicleRoutes = router;