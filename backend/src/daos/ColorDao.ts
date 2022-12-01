import { Response } from "express";
import ColorScheme from "../eschemes/ColorScheme";

class ColorDao {
  
  protected static async getColor(res: Response): Promise<any> {
    const colors = await ColorScheme.find().sort({ _id: -1 });
    res.status(200).json(colors);
  }
  

  // Obtener perfiles con orden y contando la cantidas de usuario que tiene el perfil
 
}

export default ColorDao;
