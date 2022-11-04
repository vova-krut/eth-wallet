import { Router } from "express";
import coinsController from "./coins.controller";

const coinsRouter = Router();

coinsRouter.get("/:wallet", coinsController.getBalancesForWallet);

export default coinsRouter;
