export type SpreadJWT = {
    address: string;
    privateKey: string;
    associatedAddress: string;
};

export type AuthDto = {
    signature: string;
    address: string;
};

export type MarketData = {
    spotPrice: number;
    futuresPrice: number;
    bestAskPrice: number;
    bestBidPrice: number;
    futuresBestAskPrice: number;
    futuresBestBidPrice: number;
    spread: number;
};
