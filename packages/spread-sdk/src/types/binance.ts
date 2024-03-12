export type SpreadSDKBinanceLimitOrderSymbol = 'BTCUSDT';
export type SpreadSDKBinanceLimitOrderSide = 'BUY' | 'SELL';
export type SpreadSDKBinanceLimitOrderPositionSide = 'SHORT' | 'LONG';
export type SpreadSDKBinanceLimitOrderStatus = 'NEW' | 'CANCELED' | 'EXPIRED';

export type SpreadSDKBinanceData<T> = T & {
    sdkType: 'binance';
};
export type SpreadSDKBinanceLimitOrder = SpreadSDKBinanceData<{
    avgPrice: string;
    clientOrderId: string;
    cumQuote: string;
    executedQty: string;
    orderId: number;
    origQty: string;
    origType: 'TRAILING_STOP_MARKET';
    price: string;
    reduceOnly: boolean;
    side: SpreadSDKBinanceLimitOrderSide;
    positionSide: SpreadSDKBinanceLimitOrderPositionSide;
    status: SpreadSDKBinanceLimitOrderStatus;
    stopPrice: string; // please ignore when order type is TRAILING_STOP_MARKET
    closePosition: boolean; // if Close-All
    symbol: SpreadSDKBinanceLimitOrderSymbol;
    time: number; // order time
    timeInForce: string;
    type: 'TRAILING_STOP_MARKET';
    activatePrice: string; // activation price; only return with TRAILING_STOP_MARKET order
    priceRate: string; // callback rate; only return with TRAILING_STOP_MARKET order
    updateTime: number; // update time
    workingType: 'CONTRACT_PRICE';
    priceProtect: boolean; // if conditional order trigger is protected
    priceMatch: 'NONE'; //price match mode
    selfTradePreventionMode: 'NONE'; //self trading preventation mode
    goodTillDate: number; //order pre-set auot cancel time for TIF GTD order
}>;
