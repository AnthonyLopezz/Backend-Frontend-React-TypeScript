
import { Types } from "mongoose";
import { Response } from 'express';

import cifrar from "bcryptjs";
import VehicleScheme from "../eschemes/VehicleScheme";

class VehicleDao {

   // Crear un usuario
    // ************************************************************************************
    protected static async newVehicle(plate: any, parametros: any, res: Response): Promise<any> {
        const existe = await VehicleScheme.findOne(plate).exec();
        if (existe) {
            res.status(400).json({ respuesta: "El vehiculo ya existe" });
        } else {
            const obj = new VehicleScheme(parametros);
            obj.save((miError, obj) => {
                if (miError) {
                    res.status(400).json({ respuesta: 'Error al crear el vehiculo' });
                } else {
                    res.status(200).json({ id: obj._id });
                }
            });
        }
    }
    // ************************************************************************************


    // Obtener todos los usuarios con toda la información del perfil incluída
    // ************************************************************************************
    protected static async getVehicles(res: Response): Promise<any> {
        VehicleScheme.find().sort({ _id: -1 })
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Obtener un solo usuario con toda la información del perfil incluída
    // ************************************************************************************
    protected static async getOneVehicle(identificador: any, res: Response): Promise<any> {
        const jsonVehicleId = { _id: identificador };
        VehicleScheme.findOne(jsonVehicleId)
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************



    // Eliminar usuario por identificador
    // ************************************************************************************
    protected static async deleteVehicle(identificador: any, res: Response): Promise<any> {
        const existe = await VehicleScheme.findById(identificador).exec();
        if (existe) {
            VehicleScheme.findByIdAndDelete(identificador, (miError: any, objeto: any) => {
                // VehicleScheme.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al eliminar el Vehiculo" });
                } else {
                    res.status(200).json({ eliminado: objeto });
                }
            });
        } else {
            res.status(400).json({ respuesta: "El vehiculo NO existe" });
        }
    }
    // ************************************************************************************


    // actualizar usuario por _id
    // ************************************************************************************
    protected static async updateVehicle(identificador: string, jsonExterno: any, res: Response): Promise<any> {
        delete jsonExterno._id;
        const existe = await VehicleScheme.findById(identificador).exec();
        if (existe) {
            VehicleScheme.findByIdAndUpdate(
                { _id: identificador },
                { $set: jsonExterno },
                (miError: any, objeto: any) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: 'Error al actualizar el vehiculo, puede que la placa esta repetido' });
                    } else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
        } else {
            res.status(400).json({ respuesta: "El vehiculo NO existe" });
        }
    }
    // ************************************************************************************

}

export default VehicleDao;
