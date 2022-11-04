import cron from "cron";
import fs from "fs";
import coinsService from "../coins/coins.service";

export const logJob = new cron.CronJob("*/1 * * * *", async () => {
    const wallet = process.env.WALLET!;
    const coins = process.env.COINS;

    const balances = await coinsService.getBalancesForWallet(wallet, coins);

    const result = { ...balances, timeStamp: new Date().toString() };

    fs.writeFileSync("data.json", JSON.stringify(result));
});
