import { Request, Response } from "express";
import ICarController from "../interfaces/car/ICarController.js";
import ICarService from "../interfaces/car/ICarService.js";
import mapStatusHTTP from "../utils/mapStatusHTTP.js";
import mapCarCategory from "../utils/mapCarCategory.js";
import nodemailer from "nodemailer";

class CarController implements ICarController {
    private carService: ICarService;
    private nm: typeof nodemailer;

    constructor(carService: ICarService) {
        this.carService = carService;
        this.nm = nodemailer;
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

    public async getCarsByCategory(req: Request, res: Response): Promise<Response> {
        try {
            const category = mapCarCategory(Number(req.query.category));
            const { data, status } = await this.carService.getCarsByCategory(category);
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

    public findCheapestCar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { startDate, endDate, loyaltyProgram, email } = req.body;

            if (!startDate || !endDate) {
                return res.status(400).json({ message: 'Datas de início e fim são obrigatórias.' });
            }

            const loyalty = loyaltyProgram === true || loyaltyProgram === 'true';

            const result = await this.carService.findCheapestCar(
                startDate,
                endDate,
                loyalty
            ) as any;

            if (result.status === 'NOT_FOUND') {
                return res.status(200).json([])
            }

            if (email) {
                const transporter = this.nm.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Carro Mais Barato Encontrado',
                    text: `O carro mais barato é ${result.data.car.manufacturer} ${result.data.car.model} com o preço total de R$ ${result.data.totalPrice.toFixed(2)}.`,
                };
                await transporter.sendMail(mailOptions);

            }


            return res.status(200).json(result.data);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };
}

export { CarController };