import { Response, Request } from "express";
import ColorDao from "../daos/ColorDao";

class ColorController extends ColorDao {

  public query(req: Request, res: Response): void {
    ColorController.getColor(res);
  }

}

const colorController = new ColorController();
export default colorController;
