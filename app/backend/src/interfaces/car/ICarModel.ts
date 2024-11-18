import { Car } from "@prisma/client";

export type InsertCar = Omit<Car, "id">;
export type SelectCar = Car;

export default interface ICarModel {
    registerCar(car: InsertCar): Promise<SelectCar | string>;
    getCars(): Promise<SelectCar[] | string>;
}
