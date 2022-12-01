import { Router } from "express";
import colorController from "../controllers/ColorController";

class ColorRoute {
  public apiRoute: Router;

  constructor() {
    this.apiRoute = Router();
    this.loadRoutes();
  }
  public loadRoutes(): void {
    this.apiRoute.get("/all", colorController.query);
  }
}

const colorRoute = new ColorRoute();
export default colorRoute.apiRoute;
