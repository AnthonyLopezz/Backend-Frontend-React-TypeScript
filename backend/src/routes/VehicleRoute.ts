
import { Router } from "express";
import vehicleController from "../controllers/VehicleController";

class VehicleRoute {

    public rutaAPI: Router;

    constructor() {
        this.rutaAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAPI.post('/crear', vehicleController.crear);
        this.rutaAPI.get('/todos', vehicleController.consulta);
        this.rutaAPI.delete('/eliminar/:id', vehicleController.eliminar);
        this.rutaAPI.put('/actualizar/:id', vehicleController.actualizar);
    }

};

const vehicleRoute = new VehicleRoute();
export default vehicleRoute.rutaAPI;