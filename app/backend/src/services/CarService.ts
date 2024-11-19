import { CarCategory } from "@prisma/client";
import ICarModel, { InsertCar, SelectCar } from "../interfaces/car/ICarModel.js";
import ICarService from "../interfaces/car/ICarService.js";
import { ServiceResponse } from "../interfaces/ServiceResponse.js";
import { eachDayOfInterval, isValid, isWeekend } from "date-fns";
import { parseISO } from "date-fns";

interface CheapestCar {
    car: SelectCar;
    totalPrice: number;
}

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
                data: { message: e as string },
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
                data: { message: e as string },
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
                data: { message: e as string },
                status: "NOT_FOUND"
            };
        }
    }

    public async removeCar(id: string): Promise<ServiceResponse<string>> {
        try {
            const result = await this.carModel.removeCar(id);
            if (result === 'NOT_FOUND') {
                return {
                    data: { message: result },
                    status: "NOT_FOUND"
                };
            }
            return {
                data: result,
                status: "SUCCESSFUL"
            };
        } catch (e) {
            return {
                data: { message: e as string },
                status: "NOT_FOUND"
            };
        }
    }

    public async findCheapestCar(
        startDate: string,
        endDate: string,
        loyaltyProgram: boolean
    ): Promise<ServiceResponse<CheapestCar>> {
        try {
            const start = parseISO(startDate);
            const end = parseISO(endDate);

            if (!isValid(start) || !isValid(end)) {
                throw new Error('Uma ou ambas as datas fornecidas são inválidas.');
            }

            if (start >= end) {
                throw new Error('A data de início deve ser anterior à data de fim.');
            }

            const interval = eachDayOfInterval({ start, end: new Date(end.getTime() - 1) });

            const weekdays = interval.filter((date) => !isWeekend(date)).length;
            const weekends = interval.filter((date) => isWeekend(date)).length;

            const weekdayPriceField = loyaltyProgram
                ? 'rentWeekdayPriceLoyalty'
                : 'rentWeekdayPrice';
            const weekendPriceField = loyaltyProgram
                ? 'rentWeekendPriceLoyalty'
                : 'rentWeekendPrice';

            const cars = await this.carModel.getCars() as SelectCar[];

            if (cars.length === 0) {
                return {
                    data: [] as any,
                    status: 'NOT_FOUND'
                }
            }

            const categoryRanking: { [key: string]: number } = {
                'COMPACT_HATCH': 1,
                'MEDIUM_HATCH': 2,
                'SEDAN': 3,
                'VAN': 4,
                'PICKUP': 5,
            };

            const carsWithTotalPrice = cars.map((car) => {
                const totalPrice =
                    (car[weekdayPriceField] * weekdays) + (car[weekendPriceField] * weekends);
                return { car, totalPrice };
            });

            let cheapestCar = carsWithTotalPrice[0];

            for (const carPrice of carsWithTotalPrice) {
                if (carPrice.totalPrice < cheapestCar.totalPrice) {
                    cheapestCar = carPrice;
                } else if (
                    carPrice.totalPrice === cheapestCar.totalPrice &&
                    categoryRanking[carPrice.car.category] > categoryRanking[cheapestCar.car.category]
                ) {
                    cheapestCar = carPrice;
                }
            }
            return {
                data: cheapestCar as CheapestCar,
                status: "SUCCESSFUL"
            };
        } catch (error) {
            throw new Error(error as string);
        }

    }
}

export { CarService };