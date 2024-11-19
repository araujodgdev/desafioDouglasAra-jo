import { CarCategory } from "@prisma/client";
import { ServiceResponse } from "../ServiceResponse.js";
import { InsertCar, SelectCar } from "./ICarModel.js";

interface CheapestCar {
    car: SelectCar;
    totalPrice: number;
}

export default interface ICarService {
    createCar(car: InsertCar): Promise<ServiceResponse<SelectCar>>;
    getCars(): Promise<ServiceResponse<SelectCar[]>>;
    getCarsByCategory(category: CarCategory): Promise<ServiceResponse<SelectCar[]>>;    
    removeCar(id: string): Promise<ServiceResponse<string>>;
    findCheapestCar(startDate: string, endDate: string, loyaltyProgram: boolean): Promise<ServiceResponse<CheapestCar>>;
}