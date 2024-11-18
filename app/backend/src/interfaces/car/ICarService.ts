import { ServiceResponse } from "../ServiceResponse.js";
import { InsertCar, SelectCar } from "./ICarModel.js";

export default interface ICarService {
    createCar(car: InsertCar): Promise<ServiceResponse<SelectCar>>;
    getCars(): Promise<ServiceResponse<SelectCar[]>>;
    removeCar(id: string): Promise<ServiceResponse<string>>;
}