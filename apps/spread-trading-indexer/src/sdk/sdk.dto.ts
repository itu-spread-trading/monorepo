import { CreateOrderDto } from 'src/order/order.dto';

export class GetTokenPairDto {
    symbol: string;
    chainId: number;
}

export class SwapQuoteDto {
    swapParams: {
        src: string; // Token address of 1INCH
        dst: string; // Token address of DAI
        amount: string; // Amount of 1INCH to swap (in wei)
        from: string; // Address of the sender
        slippage: string; // Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
    };
    chainId: number;
}

export class StartSellSpreadDto extends CreateOrderDto {
    calldata: string;
    metaCalldata: string;
    usdtAddress: string;
    contractAddress: string;
}

export class StartBuySpreadDto extends CreateOrderDto {
    calldata: string;
    metaCalldata: string;
    tokenAddress: string;
    contractAddress: string;
}
