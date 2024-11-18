import ICarModel, { InsertCar, SelectCar } from "../interfaces/car/ICarModel.js";
import { PrismaClientSingleton } from "../db/PrismaClient.js";
import { Prisma } from "@prisma/client";

class CarModel implements ICarModel {

    constructor() { }

    async registerCar(car: InsertCar): Promise<SelectCar | string> {
        try {
            const db = await PrismaClientSingleton.getInstance().$connect().then(() => PrismaClientSingleton.getInstance());
            let newCar = await db.car.create({
                data: car
            })
            db.$disconnect();
            return newCar;
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                switch (e.code) {
                    case 'P2002':
                        return 'Error: There is a unique constraint violation';
                }
            }
            return e.message;
        }
    }

}

export { CarModel };