import { IsString } from 'class-validator';

export class SpreadQueryParams {
  /**
   * Symbol of the token pair to calculate spread for
   */
  @IsString()
  symbol: string;
}

export class SpreadGraphQueryParams {
  /**
   * Symbol of the token pair to calculate the graph data
   */
  @IsString()
  symbol: string;

  /**
   * Interval of the graph data
   */
  interval: '5m' | '1h' | '4h' | '1d';

  /**
   * Interval of the graph data
   */
  range: '1d' | '1w' | '1m' | '3m' | '6m';
}

export class SpreadResponse {
  /**
   * Spread between futures and spot
   */
  spread: number;

  /**
   * Date of spread
   */
  date: Date;
}

export class SpreadStandardDeviationResponse {
  /**
   * Standard deviation of spread between futures and spot
   */
  value: number;
}

export class SpreadBffResponse {
  /**
   * Spread between futures and spot
   */
  latestSpread: number;

  /**
   * Mean spread between futures and spot
   */
  mean: number;

  /**
   * 1 month spread mean between futures and spot
   */

  /**
   * 1 month spread range between futures and spot
   */
  oneMonthRange: number;

  /**
   * 3 month spread range between futures and spot
   */
  threeMonthsRange: number;

  /**
   * 6 month spread range between futures and spot
   */
  sixMonthsRange: number;
}

export class SpreadCandleResponse {
  open: number;
  high: number;
  low: number;
  close: number;
  date: Date;
}

export class SpreadMeanResponse {
  value: number;
  date: Date;
}
