import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';
import axios, { AxiosInstance } from 'axios';

export class SpreadFetcher {
    spotAxios: AxiosInstance;
    futuresAxios: AxiosInstance;

    constructor() {
        this.spotAxios = axios.create({
            baseURL: 'https://api.binance.com/api/v3',
        });
        this.futuresAxios = axios.create({
            baseURL: 'https://fapi.binance.com/fapi/v1',
        });
    }

    async fetch(symbol: SpreadSDKSupportedSymbols) {
        const spotPriceRequest = this.spotAxios.get('/ticker/price', {
            params: {
                symbol,
            },
        });

        const futuresPriceRequest = this.futuresAxios.get('/ticker/price', {
            params: {
                symbol,
            },
        });

        const bestAskAndBidRequest = this.spotAxios.get('/depth', {
            params: {
                symbol,
            },
        });

        const futuresBestAskAndBidRequests = this.futuresAxios.get('/depth', {
            params: {
                symbol,
            },
        });

        const responses = await Promise.all([
            spotPriceRequest,
            futuresPriceRequest,
            bestAskAndBidRequest,
            futuresBestAskAndBidRequests,
        ]);

        const [
            spotPriceResponse,
            futuresPriceResponse,
            bestAskAndBidResponse,
            futuresBestAskAndBidResponse,
        ] = responses;

        const bestBid = bestAskAndBidResponse.data.bids[0];
        const bestAsk = bestAskAndBidResponse.data.asks[0];
        const futuresBestBid = futuresBestAskAndBidResponse.data.bids[0];
        const futuresBestAsk = futuresBestAskAndBidResponse.data.asks[0];

        const spotPricesResponseData = spotPriceResponse.data;
        const futuresPriceResponseData = futuresPriceResponse.data;

        const spotPrice = spotPricesResponseData.price;
        const futuresPrice = futuresPriceResponseData.price;
        const bestAskPrice = bestAsk[0];
        const bestBidPrice = bestBid[0];
        const futuresBestAskPrice = futuresBestAsk[0];
        const futuresBestBidPrice = futuresBestBid[0];

        const spread = Math.log(futuresBestBidPrice / bestBidPrice) * 100;

        return {
            spotPrice,
            futuresPrice,
            bestAskPrice,
            bestBidPrice,
            futuresBestAskPrice,
            futuresBestBidPrice,
            spread,
        };
    }
}
