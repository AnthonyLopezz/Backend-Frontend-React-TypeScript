import dotenv from "dotenv"; // Variables de configuración
import cors from "cors"; //Bloquear acceso a los usuarios
import morgan from "morgan"; //Peticiones Http
import express from "express";
import ConnectionDb from "./connection/ConnectionDb";
import profileRoute from "../routes/ProfileRoute";
import userRoute from "../routes/UserRoute";
import security from "../middlewares/Security";
import privateUserRoute from "../routes/PrivateUserRoute";
import vehicleRoute from "../routes/VehicleRoute";
import colorRoute from "../routes/ColorRoute";
import brandRoute from "../routes/BrandRoute";

// Here should be the routes's imports.

class Server {
  public app: express.Application;

  constructor() {
    dotenv.config({ path: "variables.env" });
    ConnectionDb();
    this.app = express();

    this.loadSettings();
    this.loadRoutes();
  }

  public loadSettings() {
    //The most basic configuration.
    this.app.set("PORT", process.env.PORT);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "20mb" }));
    this.app.use(express.urlencoded({ extended: true })); // Recibir parametros de cualquier tipo y codifica eso y recibelo
  }

  public loadRoutes() {
    // Public
    this.app.use("/api/public/users", userRoute);
    // private
    this.app.use("/api/private/profiles", security.verifyToken, profileRoute);
    this.app.use("/api/private/colors", security.verifyToken, colorRoute);
    this.app.use("/api/private/brands", security.verifyToken, brandRoute);
    this.app.use("/api/private/users", security.verifyToken, privateUserRoute);
    this.app.use("/api/private/vehicles", security.verifyToken, vehicleRoute);

  }

  public startBackend() {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("SERVER: ", this.app.get("PORT"));
    });
  }
}

export default Server;
