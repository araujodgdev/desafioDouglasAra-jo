import ICarModel, { InsertCar, SelectCar } from "../interfaces/ICarModel.js";
import { PrismaClientSingleton } from "../utils/PrismaClient.js";

class CarModel implements ICarModel {

    constructor() { }

    async registerCar(car: InsertCar): Promise<SelectCar | null> {
        try {
            let newCar = await PrismaClientSingleton.getInstance().car.create({
                data: car
            })
            return newCar;
        } catch (error) {
            return null;
        }

    }

}

export { CarModel };