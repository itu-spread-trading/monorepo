import {
  Controller,
  Get,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { TokenEntity } from 'src/entities/token.entity';
import { IndexerService } from 'src/indexer/indexer.service';
import { Environment } from 'src/utils/Environment';

@Controller('indexer')
export class IndexerController implements OnApplicationBootstrap {
  constructor(private readonly indexerService: IndexerService) {}
  logger = new Logger(IndexerController.name);

  onApplicationBootstrap() {
    if (Environment.ENV === 'dev') {
      return;
    }
    this.indexerService.genIndex();
  }

  /**
   * @description Get latest indexed token list
   */
  @Get('latest')
  genLatestTokens(): Promise<Array<TokenEntity>> {
    return this.indexerService.genLatestTokens();
  }
}
