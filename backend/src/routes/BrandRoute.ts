import { Router } from "express";
import brandController from "../controllers/BrandController";

class BrandRoute {
  public apiRoute: Router;

  constructor() {
    this.apiRoute = Router();
    this.loadRoutes();
  }
  public loadRoutes(): void {
    this.apiRoute.get("/all", brandController.query);
  }
}

const crandRoute = new BrandRoute();
export default crandRoute.apiRoute;
