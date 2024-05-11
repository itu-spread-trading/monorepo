import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
    GetTokenPairDto,
    StartBuySpreadDto,
    StartSellSpreadDto,
    SwapQuoteDto,
} from 'src/sdk/sdk.dto';
import { SDKService } from 'src/sdk/sdk.service';

@Controller('sdk')
export class SDKController {
    constructor(private readonly sdkService: SDKService) {}

    @Get('/tokenpair')
    async genTokenPair(@Query() query: GetTokenPairDto) {
        return this.sdkService.genToken(query);
    }

    @Post('/swapquote')
    async genSwapQuote(@Body() dto: SwapQuoteDto) {
        return this.sdkService.genSwapQuote(dto);
    }

    @Post('/sell')
    async genStartSellSpread(@Body() dto: StartSellSpreadDto) {
        return this.sdkService.genStartSellSpread(dto);
    }

    @Post('/buy')
    async genStartBuySpread(@Body() dto: StartBuySpreadDto) {
        return this.sdkService.genStartBuySpread(dto);
    }
}
