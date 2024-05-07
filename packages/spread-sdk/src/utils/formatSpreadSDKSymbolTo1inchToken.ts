import { SpreadSDKSupportedSymbols } from '../types';

export const formatSpreadSDKSymbolTo1inchToken = (
    symbol: SpreadSDKSupportedSymbols,
): string => {
    if (symbol === 'BNBUSDT') {
        return 'WBNB';
    } else if (symbol === 'ETHUSDT') {
        return 'WETH';
    } else if (symbol === 'BTCUSDT') {
        return 'BTCB';
    } else {
        return symbol.replace('USDT', '');
    }
};
