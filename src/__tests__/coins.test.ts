import supertest from "supertest";
import createServer from "../utils/createServer";

const app = createServer();

describe("coins", () => {
    describe("get balance for wallet route", () => {
        describe("wallet is not valid", () => {
            it("should return an error", async () => {
                const wallet = "notValidWallet";
                const { body, statusCode } = await supertest(app).get(
                    `/coins/${wallet}`
                );

                expect(statusCode).toEqual(404);
                expect(body).toEqual({
                    message: expect.any(String),
                });
            });
        });

        describe("wallet is valid", () => {
            const wallet = "0xA145ac099E3d2e9781C9c848249E2e6b256b030D";

            describe("with additional coins", () => {
                it("should return a 200 status and total balance", async () => {
                    const coins = "tether";
                    const { body, statusCode } = await supertest(app).get(
                        `/coins/${wallet}?coins=${coins}`
                    );

                    expect(statusCode).toEqual(200);
                    expect(body).toEqual({
                        coinsBalance: {
                            tether: expect.any(Number),
                        },
                        ethBalance: expect.any(String),
                    });
                });
            });

            describe("with invalid additional coins", () => {
                it("should return a 404 status and error message", async () => {
                    const coins = "tethers";
                    const { body, statusCode } = await supertest(app).get(
                        `/coins/${wallet}?coins=${coins}`
                    );

                    expect(statusCode).toEqual(404);
                    expect(body).toEqual({
                        message: expect.any(String),
                    });
                });
            });

            describe("without additional coins", () => {
                it("should return a 200 status and only ethereum balance", async () => {
                    const { body, statusCode } = await supertest(app).get(
                        `/coins/${wallet}`
                    );

                    expect(statusCode).toEqual(200);
                    expect(body).toEqual({
                        ethBalance: expect.any(String),
                    });
                });
            });
        });
    });
});
