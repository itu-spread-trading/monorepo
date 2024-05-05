import { config } from 'dotenv';
import { nullthrows } from 'src/utils/nullthrows';

config();

export class Environment {
  /**
   * @description App Port
   */
  public static readonly PORT = nullthrows(
    process.env.PORT,
    'PORT is not defined',
  );

  /**
   * @description Database Host
   */
  public static readonly DB_HOST: string = nullthrows(
    process.env.DB_HOST,
    'DB_HOST is not defined',
  );

  /**
   * @description Database Password
   */
  public static readonly DB_PASSWORD: string = nullthrows(
    process.env.DB_PASSWORD,
    'DB_PASSWORD is not defined',
  );

  /**
   * @description Database Name
   */
  public static readonly DB_NAME: string = nullthrows(
    process.env.DB_NAME,
    'DB_NAME is not defined',
  );

  /**
   * @description App Port
   */
  public static readonly DB_USER: string = nullthrows(
    process.env.DB_USER,
    'DB_USER is not defined',
  );

  /**
   * @description App Environment - dev, prod
   */
  public static readonly ENV: string = nullthrows(
    process.env.ENV,
    'ENV is not defined',
  );

  /**
   * @description JWT Secret for auth tokens
   */
  public static readonly JWT_SECRET: string = nullthrows(
    process.env.JWT_SECRET,
    'JWT_SECRET is not defined',
  );

  /**
   * @description 1inch API KEY
   */
  public static readonly ONEINCH_API_KEY: string = nullthrows(
    process.env.ONEINCH_API_KEY,
    '1INCH_API_KEY is not defined',
  );
}
