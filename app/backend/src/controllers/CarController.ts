import { Request, Response } from "express";
import ICarController from "../interfaces/car/ICarController.js";
import ICarService from "../interfaces/car/ICarService.js";
import mapStatusHTTP from "../utils/mapStatusHTTP.js";
import mapCarCategory from "../utils/mapCarCategory.js";

class CarController implements ICarController {
    private carService: ICarService;

    constructor(carService: ICarService) {
        this.carService = carService;
    }

    public async createCar(req: Request, res: Response): Promise<Response> {
        try {
            req.body.category = mapCarCategory(req.body.category);
            const { data, status } = await this.carService.createCar(req.body);
            return res.status(mapStatusHTTP(status)).json(data);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async getCars(req: Request, res: Response): Promise<Response> {
        try {
            const { data, status } = await this.carService.getCars();
            return res.status(mapStatusHTTP(status)).json(data);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async removeCar(req: Request, res: Response): Promise<Response> {
        try {
            const { data, status } = await this.carService.removeCar(req.params.id);
            return res.status(mapStatusHTTP(status)).json(data);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export { CarController };