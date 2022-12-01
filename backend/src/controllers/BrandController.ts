import { Response, Request } from "express";
import BrandDao from "../daos/BrandDao";

class BrandController extends BrandDao {

  public query(req: Request, res: Response): void {
    BrandController.getBrand(res);
  }

}

const brandController = new BrandController();
export default brandController;
