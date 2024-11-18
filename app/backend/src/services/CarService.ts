import { CarCategory } from "@prisma/client";
import ICarModel, { InsertCar, SelectCar } from "../interfaces/car/ICarModel.js";
import ICarService from "../interfaces/car/ICarService.js";
import { ServiceResponse } from "../interfaces/ServiceResponse.js";
import mapCarCategory from "../utils/mapCarCategory.js";

class CarService implements ICarService {
    private carModel: ICarModel;

    constructor(model: ICarModel) {
        this.carModel = model;
    }

    public async createCar(car: InsertCar): Promise<ServiceResponse<SelectCar>> {
        try {
            let newCar = await this.carModel.registerCar(car);
            return {
                data: newCar as SelectCar,
                status: "CREATED"
            };
        } catch (e) {
            return {
                data: {message: e as string},
                status: "CONFLICT"
            };
        }
    }

    public async getCars(): Promise<ServiceResponse<SelectCar[]>> {
        try {
            const cars = await this.carModel.getCars();
            return {
                data: cars as SelectCar[],
                status: "SUCCESSFUL"
            };
        } catch (e) {
            return {
                data: {message: e as string},
                status: "NOT_FOUND"
            };
        }
    }

    public async getCarsByCategory(category: CarCategory): Promise<ServiceResponse<SelectCar[]>> {
        try {
            const cars = await this.carModel.getCarsByCategory(category);
            return {
                data: cars as SelectCar[],
                status: "SUCCESSFUL"
            };
        } catch (e) {
            return {
                data: {message: e as string},
                status: "NOT_FOUND"
            };
        }
    }

    public async removeCar(id: string): Promise<ServiceResponse<string>> {
        try {
            const result = await this.carModel.removeCar(id);
            if (result === 'NOT_FOUND') {
                return {
                    data: {message: result},
                    status: "NOT_FOUND"
                };
            }
            return {
                data: result,
                status: "SUCCESSFUL"
            };
        } catch (e) {
            return {
                data: {message: e as string},
                status: "NOT_FOUND"
            };
        }
    }
}

export { CarService };