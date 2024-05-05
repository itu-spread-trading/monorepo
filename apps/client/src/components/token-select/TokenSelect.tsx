import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useTokenPairQuery } from '@/queries';
import { useOneInchTokenPair, useSetTokenPair, useTokenPair } from '@/store';
import { symbolToImage } from '@/utils';
import {
    SpreadSDKSupportedSymbols,
    formatAddress,
    formatSpreadSDKSymbolTo1inchToken,
} from '@ituspreadtrading/sdk';
import { ReactNode } from 'react';

const tokenPairs = [
    'BNBUSDT',
    'ETHUSDT',
    'BTCUSDT',
    'XRPUSDT',
    'SOLUSDT',
    'ADAUSDT',
    'DOGEUSDT',
    'TRXUSDT',
    'MATICUSDT',
    'DOTUSDT',
    'LINKUSDT',
    'LTCUSDT',
    'USDCUSDT',
    'AVAXUSDT',
    'XMRUSDT',
    'ATOMUSDT',
    'UNIUSDT',
    'FILUSDT',
    'APTUSDT',
    'MKRUSDT',
] as Array<SpreadSDKSupportedSymbols>;

const formatUSDTTokenPairName = (name: SpreadSDKSupportedSymbols) => {
    const split = name.split('USDT');
    return `${split[0]} / USDT`;
};

export const TokenSelect = (): ReactNode => {
    const setTokenPair = useSetTokenPair();
    const tokenPair = useTokenPair();
    const oneInchTokenPair = useOneInchTokenPair();

    return (
        <div className="flex space-x-4 items-center">
            <Select
                onValueChange={(e: SpreadSDKSupportedSymbols) => {
                    setTokenPair(e);
                }}
                defaultValue={tokenPair}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a token pair" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {tokenPairs.map((tokenPair) => (
                            <SelectItem key={tokenPair} value={tokenPair}>
                                <div className="flex items-center">
                                    <img
                                        className="w-6 h-6 mr-1 rounded-full bg-white"
                                        src={symbolToImage(tokenPair).src}
                                    />
                                    {formatUSDTTokenPairName(tokenPair)}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="flex flex-col space-y-2">
                <Badge>
                    {formatSpreadSDKSymbolTo1inchToken(tokenPair)}:{' '}
                    {oneInchTokenPair.TOKEN}
                </Badge>
                <Badge>USDT: {oneInchTokenPair.USDT}</Badge>
            </div>
        </div>
    );
};
