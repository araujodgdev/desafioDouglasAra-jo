import { Router } from "express";
import { carRouter } from "./car.routes.js";

const router = Router();

router.use("/api/cars", carRouter);

export { router };  