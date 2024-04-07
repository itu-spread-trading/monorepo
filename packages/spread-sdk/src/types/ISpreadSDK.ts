import { ISpreadSDKOrderbookModule } from './ISpreadSDKOrderbookModule';
import { ISpreadSDKSwapModule } from './ISpreadSDKSwapModule';

export interface ISpreadSDK {
    /**
     * Modules
     */
    orderbook: ISpreadSDKOrderbookModule;
    swap: ISpreadSDKSwapModule;
}
