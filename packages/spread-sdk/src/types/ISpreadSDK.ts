import { ISpreadSDKOrderbookModule } from './ISpreadSDKOrderbookModule';
import { ISpreadSDKSwapModule } from './ISpreadSDKSwapModule';
import { ISpreadSDKTokenModule } from './ISpreadSDKTokenModule';

export interface ISpreadSDK {
    /**
     * Modules
     */
    orderbook: ISpreadSDKOrderbookModule;
    swap: ISpreadSDKSwapModule;
    token: ISpreadSDKTokenModule;
}
