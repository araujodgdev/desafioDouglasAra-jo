import {Request, Response} from 'express'

export default interface ICarController {
    createCar: (req: Request, res: Response) => Promise<Response>;
}