import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/token.entity';
import {
  SpreadCandleResponse,
  SpreadGraphQueryParams,
  SpreadMeanResponse,
  SpreadQueryParams,
  SpreadResponse,
  SpreadStandardDeviationResponse,
} from 'src/spread/spread.dto';
import { FindOptionsWhere, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class SpreadService {
  private readonly logger = new Logger(SpreadService.name);

  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}

  async genMeanGraphData(
    query: SpreadGraphQueryParams,
  ): Promise<Array<SpreadMeanResponse>> {
    const groups = await this.genSpreadGroups(query);

    const flatten = groups.flat();
    const spreads = flatten.map((token) =>
      this.getSpreadFromTokenEntity(token),
    );

    let count = 1;
    const graphData = spreads.map(() => {
      const mean = spreads.slice(0, count).reduce((a, b) => a + b) / count;
      count++;
      return {
        value: mean,
        date: flatten[count - 1]?.date ?? new Date(),
      };
    });

    return graphData;
  }

  async genStandardDeviation(
    query: SpreadGraphQueryParams,
  ): Promise<SpreadStandardDeviationResponse> {
    const groups = await this.genSpreadGroups(query);
    const flatten = groups.flat();
    const spreads = flatten.map((token) =>
      this.getSpreadFromTokenEntity(token),
    );
    const count = spreads.length;
    const mean = spreads.reduce((a, b) => a + b) / count;

    const sd = Math.sqrt(
      spreads.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) /
        (count - 1),
    );

    return { value: sd };
  }

  async genSpreadGraphData(
    query: SpreadGraphQueryParams,
  ): Promise<Array<SpreadCandleResponse>> {
    const groups = await this.genSpreadGroups(query);

    const graphData: Array<SpreadCandleResponse> = groups.map((group) => {
      const spreads = group.map((token) =>
        this.getSpreadFromTokenEntity(token),
      );
      return {
        open: spreads[0],
        high: Math.max(...spreads),
        low: Math.min(...spreads),
        close: spreads[spreads.length - 1],
        date: group[0].date,
      };
    });

    return graphData;
  }

  async genSpread(query: SpreadQueryParams): Promise<SpreadResponse> {
    const { symbol } = query;

    const findOptionsWhere: FindOptionsWhere<TokenEntity> = {
      symbol: symbol,
    };

    const token = await this.tokenRepository.findOne({
      where: findOptionsWhere,
      order: { date: 'DESC' },
    });

    const spread = this.getSpreadFromTokenEntity(token);
    return {
      spread: spread,
      date: token.date,
    };
  }

  async genBffData(query: SpreadQueryParams): Promise<void> {
    const { symbol } = query;

    const findOptionsWhere: FindOptionsWhere<TokenEntity> = {
      symbol: symbol,
    };

    const mean = await this.tokenRepository
      .createQueryBuilder('token')
      .select(
        'AVG(LOG(token.futures_best_bid_price / token.best_bid_price))',
        'mean',
      )
      .where(findOptionsWhere)
      .getRawOne();

    console.log(mean);
  }

  private async genSpreadGroups(
    query: SpreadGraphQueryParams,
  ): Promise<Array<Array<TokenEntity>>> {
    const range = query.range ?? '1m';
    const date = new Date();
    if (range === '1d') {
      date.setDate(date.getDate() - 1);
    } else if (range === '1w') {
      date.setDate(date.getDate() - 7);
    } else if (range === '1m') {
      date.setMonth(date.getMonth() - 1);
    } else if (range === '3m') {
      date.setMonth(date.getMonth() - 3);
    } else if (range === '6m') {
      date.setMonth(date.getMonth() - 6);
    }

    const allData = await this.tokenRepository.find({
      where: {
        symbol: query.symbol,
        date: MoreThanOrEqual(date),
      },
    });

    let intervalSize = 12;
    if (query.interval === '1h') {
      intervalSize = 12;
    } else if (query.interval === '4h') {
      intervalSize = 12 * 4;
    } else if (query.interval === '1d') {
      intervalSize = 12 * 24;
    } else if (query.interval === '5m') {
      intervalSize = 1;
    }

    const groups: Array<Array<TokenEntity>> = [];

    for (let i = 0; i < allData.length; i += intervalSize) {
      const group = allData.slice(i, i + intervalSize);
      groups.push(group);
    }
    return groups;
  }

  private getSpreadFromTokenEntity(token: TokenEntity): number {
    const futures_bid = Number(token.futures_best_bid_price);
    const spot_bid = Number(token.best_bid_price);

    return Math.log(futures_bid / spot_bid) * 100;
  }
}
