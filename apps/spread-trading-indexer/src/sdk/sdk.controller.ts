import { Controller, Get, Query } from '@nestjs/common';
import { GetTokenPairDto } from 'src/sdk/sdk.dto';
import { SDKService } from 'src/sdk/sdk.service';

@Controller('sdk')
export class SDKController {
    constructor(private readonly sdkService: SDKService) {}

    @Get('/tokenpair')
    async genTokenPair(@Query() query: GetTokenPairDto) {
        return this.sdkService.genToken(query);
    }
}
