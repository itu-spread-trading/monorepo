import { Controller, Get, Query } from '@nestjs/common';
import { SDKService } from 'src/sdk/sdk.service';
import { GetTokenPairDto } from 'src/sdk/sdk.dto';

@Controller('sdk')
export class SDKController {
  constructor(private readonly sdkService: SDKService) {}

  @Get('/tokenpair')
  async genTokenPair(@Query() query: GetTokenPairDto) {
    return this.sdkService.genTokenPair(query);
  }
}
