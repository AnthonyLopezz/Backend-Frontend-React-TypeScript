import { Response } from "express";
import BrandScheme from "../eschemes/BrandScheme";
import ColorScheme from "../eschemes/ColorScheme";

class BrandDao {
  
  protected static async getBrand(res: Response): Promise<any> {
    const brands = await BrandScheme.find().sort({ _id: -1 });
    res.status(200).json(brands);
  }
  

  // Obtener perfiles con orden y contando la cantidas de usuario que tiene el perfil
 
}

export default BrandDao;
