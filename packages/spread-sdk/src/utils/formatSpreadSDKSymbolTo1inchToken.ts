import { SpreadSDKSupportedSymbols } from '../types';

export const formatSpreadSDKSymbolTo1inchToken = (
    symbol: SpreadSDKSupportedSymbols,
): string => {
    if (symbol === 'BNBUSDT') {
        return 'WBNB';
    } else if (symbol === 'ETHUSDT') {
        return 'WETH';
    } else {
        return symbol.replace('USDT', '');
    }
};
