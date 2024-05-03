import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useSetTokenPair, useTokenPair } from '@/store';
import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';
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

    return (
        <>
            <Select
                onValueChange={(e: SpreadSDKSupportedSymbols) => {
                    setTokenPair(e);
                }}
                defaultValue={tokenPair}
            >
                <h6>Token pair</h6>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a token pair" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {tokenPairs.map((tokenPair) => (
                            <SelectItem key={tokenPair} value={tokenPair}>
                                {formatUSDTTokenPairName(tokenPair)}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
};
