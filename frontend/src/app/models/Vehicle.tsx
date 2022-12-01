import Brand from "./Brand";
import Color from "./Color";

class Vehicle {
  public _id: string;
  public brandId: Brand;
  public colorId: Color;
  public plate: string;

  constructor(id: string, brand: Brand, color: Color, plate: string) {
    this._id = id;
    this.brandId = brand;
    this.colorId = color;
    this.plate = plate;
  }
}
export default Vehicle;
