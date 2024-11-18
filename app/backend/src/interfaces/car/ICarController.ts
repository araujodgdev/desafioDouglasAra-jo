import {Request, Response} from 'express'

export default interface ICarController {
    createCar: (req: Request, res: Response) => Promise<Response>;
    getCars: (req: Request, res: Response) => Promise<Response>;
    getCarsByCategory: (req: Request, res: Response) => Promise<Response>;
    removeCar: (req: Request, res: Response) => Promise<Response>;
}
