import {Request, Response} from 'express'

export default interface ICarController {
    createCar: (req: Request, res: Response) => Promise<Response>;
    getCars: (req: Request, res: Response) => Promise<Response>;
}