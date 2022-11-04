import express from "express";
import coinsRouter from "../coins/coins.routes";
import errorMiddleware from "../middlewares/error.middleware";

function createServer() {
    const app = express();

    app.use("/coins", coinsRouter);
    app.use(errorMiddleware);

    return app;
}

export default createServer;
