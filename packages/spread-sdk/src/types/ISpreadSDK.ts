import { ISpreadSDKOrderbookModule } from './ISpreadSDKOrderbookModule';
import { ISpreadSDKSwapModule } from './ISpreadSDKSwapModule';

export interface ISpreadSDK {
    orderbook: ISpreadSDKOrderbookModule;
    swap: ISpreadSDKSwapModule;
}
