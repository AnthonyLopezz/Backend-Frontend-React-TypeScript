import { Request, Response } from 'express';
import VehicleDao from '../daos/VehicleDao';


class VehicleController extends VehicleDao {

    public crear(req: Request, res: Response): void {
        const plate = { plate: req.body.plate };
        VehicleController.newVehicle(plate, req.body, res);
    }

    public consulta(req: Request, res: Response): void {
        VehicleController.getVehicles(res);
    }

    public consultaUno(req: Request, res: Response): void {
        VehicleController.getOneVehicle(req.params.id, res);
    }

    public eliminar(req: Request, res: Response): void {
        VehicleController.deleteVehicle(req.params.codUser, res);
    }

    public actualizar(req: Request, res: Response): void {
        VehicleController.updateVehicle(req.params.codUser, req.body, res);
    }
};

const vehicleController = new VehicleController();
export default vehicleController;