import { Router, Request, Response } from "express";
import { CarController } from "../controllers/CarController.js";
import { CarService } from "../services/CarService.js";
import { CarModel } from "../models/CarModel.js";

const carRouter = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRouter.post(
  "/", 
  (req: Request, res: Response): void => {
    carController.createCar(req, res);
  }
);

carRouter.get(
  "/", 
  (req: Request, res: Response): void => {
    carController.getCars(req, res);
  }
);

carRouter.delete(
  "/:id", 
  (req: Request, res: Response): void => {
    carController.removeCar(req, res);
  }
);

export { carRouter };