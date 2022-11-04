import { NextFunction, Request, Response } from "express";
import coinsService from "./coins.service";

class CoinsController {
    async getBalancesForWallet(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const wallet = req.params.wallet;
            const coins = req.query.coins as string | undefined;
            const balances = await coinsService.getBalancesForWallet(
                wallet,
                coins
            );
            return res.json(balances);
        } catch (e) {
            next(e);
        }
    }
}

export default new CoinsController();
