import Web3 from "web3";
import ApiError from "../errors/api.error";
import axios from "axios";
import { minABI } from "../minABI";
import dotenv from "dotenv";
dotenv.config();

class CoinsService {
    web3 = new Web3(process.env.ETH_URI!);

    async getBalancesForWallet(wallet: string, coins?: string) {
        const ethBalance = await this._getEthBalance(wallet);

        if (!coins) {
            return { ethBalance };
        }

        const coinsBalance = await this._getCoinsBalance(coins, wallet);

        return { coinsBalance, ethBalance };
    }

    private async _getEthBalance(wallet: string) {
        try {
            const ethBalanceInWei = await this.web3.eth.getBalance(wallet);
            const ethBalance = this.web3.utils.fromWei(
                ethBalanceInWei,
                "ether"
            );

            return ethBalance;
        } catch (e) {
            throw ApiError.notFound(`Wallet ${wallet} was not found`);
        }
    }

    private async _getCoinsBalance(coins: string, wallet: string) {
        const coinsArray = coins.split(",");
        let coinsBalance = {};

        for (const coin of coinsArray) {
            try {
                const coinBalance = await this._getCoinBalance(coin, wallet);

                coinsBalance = {
                    ...coinsBalance,
                    [coin]: coinBalance,
                };
            } catch (e) {
                throw ApiError.notFound(`Coin with id '${coin}' was not found`);
            }
        }

        return coinsBalance;
    }

    private async _getCoinBalance(coin: string, wallet: string) {
        const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin}`
        );

        const coinAddress = data.platforms.ethereum;
        const decimalPlace = data.detail_platforms.ethereum.decimal_place;

        const balance = await this._getCoinBalanceFromEthNetwork(
            coinAddress,
            wallet
        );

        const formattedBalance = this._formatBalance(balance, decimalPlace);

        return formattedBalance;
    }

    private async _getCoinBalanceFromEthNetwork(
        coinAddress: string,
        wallet: string
    ) {
        const contract = new this.web3.eth.Contract(minABI, coinAddress);
        const balance = await contract.methods.balanceOf(wallet).call();

        return balance;
    }

    private _formatBalance(balance: number, decimalPlace: number) {
        const formattedBalance = balance / 10 ** decimalPlace;
        return formattedBalance;
    }
}

export default new CoinsService();
