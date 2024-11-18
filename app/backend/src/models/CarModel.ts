import ICarModel, { InsertCar, SelectCar } from "../interfaces/ICarModel.js";
import { PrismaClientSingleton } from "../utils/PrismaClient.js";
import { Prisma } from "@prisma/client";

class CarModel implements ICarModel {

    constructor() { }

    async registerCar(car: InsertCar): Promise<SelectCar | any> {
        try {
            const db = await PrismaClientSingleton.getInstance().$connect().then(() => PrismaClientSingleton.getInstance());
            let newCar = await db.car.create({
                data: car
            })
            db.$disconnect();
            return newCar;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                switch (e.code) {
                    case 'P2002':
                        console.error('Error: There is a unique constraint violation');
                        break;
                }
            }
        }

    }

}

export { CarModel };