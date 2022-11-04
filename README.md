# Test Task Junior Back-end Dev

## Wallet app

In order to run this application you need to **clone the repo to your local machine**.
Then **make sure that you have nodeJs and npm installed**. Then write **"npm i"**.
_That will download all the necessary node_modules_.

After that **create .env file in the root directory** and **add those fields to it**:

```
PORT (optional) - the port which your app will use (default - 5000)
ETH_URI - Uri for the connection to ethereum network (https://mainnet.infura.io/v3/...)
WALLET - The address of wallet which you would like to log to data.json
COINS - ERC20 coins which you would like to track down (tether,usd-coin)
```

## Endpoints

``/coins/:wallet``

_Returns balances for a certain wallet_.
Specify which coins balance would you like to get apart from ethereum with query params.

So, for example ``/coins/:wallet?coins=tether,usd-coin`` would return info about ethereum balance of the wallet along with USDT and USDC balances.
