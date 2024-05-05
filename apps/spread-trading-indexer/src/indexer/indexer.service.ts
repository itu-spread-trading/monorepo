import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { TokenEntity } from 'src/entities/token.entity';
import { TOKENPAIRS } from 'src/utils/tokenPairs';
import { Repository } from 'typeorm';

@Injectable()
export class IndexerService {
  private readonly logger = new Logger(IndexerService.name);
  spotAxios: AxiosInstance;
  futuresAxios: AxiosInstance;

  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {
    this.spotAxios = axios.create({
      baseURL: 'https://api.binance.com/api/v3',
    });
    this.futuresAxios = axios.create({
      baseURL: 'https://fapi.binance.com/fapi/v1',
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async genIndex(): Promise<void> {
    try {
      const spotPriceRequests = TOKENPAIRS.map((symbol) => {
        return this.spotAxios.get('/ticker/price', {
          params: {
            symbol,
          },
        });
      });

      const futurePriceRequests = TOKENPAIRS.map((symbol) => {
        return this.futuresAxios.get('/ticker/price', {
          params: {
            symbol,
          },
        });
      });

      const bestAskAndBidRequests = TOKENPAIRS.map((symbol) => {
        return this.spotAxios.get('/depth', {
          params: {
            symbol,
          },
        });
      });

      const futuresBestAskAndBidRequests = TOKENPAIRS.map((symbol) => {
        return this.futuresAxios.get('/depth', {
          params: {
            symbol,
          },
        });
      });

      const spotPriceResponses = await Promise.all(spotPriceRequests);
      const futuresPriceResponses = await Promise.all(futurePriceRequests);
      const bestAskAndBidResponses = await Promise.all(bestAskAndBidRequests);
      const futuresBestAskAndBidResponses = await Promise.all(
        futuresBestAskAndBidRequests,
      );

      if (spotPriceResponses.length !== 20) {
        this.logger.debug('spotPriceResponses.length !== 20');
        return;
      }

      if (futuresPriceResponses.length !== 20) {
        this.logger.debug('futuresPriceResponses.length !== 20');
        return;
      }

      if (bestAskAndBidResponses.length !== 20) {
        this.logger.debug('bestAskAndBidResponses.length !== 20');
        return;
      }

      const entites = spotPriceRequests.map((_, index) => {
        try {
          const bestBid = bestAskAndBidResponses[index].data.bids[0];
          const bestAsk = bestAskAndBidResponses[index].data.asks[0];
          const futuresBestBid =
            futuresBestAskAndBidResponses[index].data.bids[0];
          const futuresBestAsk =
            futuresBestAskAndBidResponses[index].data.asks[0];

          const spotPricesResponseData = spotPriceResponses[index].data;
          const futuresPriceResponseData = futuresPriceResponses[index].data;

          const spotPrice = spotPricesResponseData.price;
          const futuresPrice = futuresPriceResponseData.price;
          const bestAskPrice = bestAsk[0];
          const bestBidPrice = bestBid[0];

          const futuresBestAskPrice = futuresBestAsk[0];
          const futuresBestBidPrice = futuresBestBid[0];

          return this.tokenRepository.create({
            symbol: TOKENPAIRS[index],
            spot_price: spotPrice,
            futures_price: futuresPrice,
            best_ask_price: bestAskPrice,
            best_bid_price: bestBidPrice,
            futures_best_ask_price: futuresBestAskPrice,
            futures_best_bid_price: futuresBestBidPrice,
          });
        } catch {
          this.logger.error(`Error fetching ${TOKENPAIRS[index]}`);
          return null;
        }
      });
      this.logger.debug('Data fetched');

      const filteredEntities = entites.filter((entity) => entity !== null);
      await this.tokenRepository.save(filteredEntities);
    } catch (err) {
      if (err instanceof AxiosError) {
        this.logger.error(err.response.data);
      } else {
        this.logger.error(err);
      }
      this.logger.error('Error fetching data');
    }
  }

  async genLatestTokens(): Promise<Array<TokenEntity>> {
    const queries: Array<TokenEntity> = await this.tokenRepository.query(
      'SELECT * FROM token ORDER BY id DESC LIMIT 20',
    );

    return queries;
  }
}
