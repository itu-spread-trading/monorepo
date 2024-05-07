import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';

export const symbolToDecimal = (symbol: SpreadSDKSupportedSymbols): number => {
    switch (symbol) {
        case 'BNBUSDT':
        case 'ETHUSDT':
            return 18;
        case 'USDCUSDT':
            return 6;
        case 'BTCUSDT':
            return 8;
        default:
            return 18;
    }
};
