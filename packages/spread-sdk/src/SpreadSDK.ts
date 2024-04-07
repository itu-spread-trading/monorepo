import { SpreadSDKError } from './SpreadSDKError';
import { SpreadSDKOrderbookModule, SpreadSDKSwapModule } from './modules';
import {
    ISpreadSDK,
    ISpreadSDKOrderbookModule,
    ISpreadSDKSwapModule,
    SpreadSDKInitProps,
    SpreadSDKModuleInitProps,
} from './types';

export class SpreadSDK implements ISpreadSDK {
    /**
     * Initialized state
     */
    private initialized: boolean = false;

    /**
     * Modules
     */
    orderbook: ISpreadSDKOrderbookModule;
    swap: ISpreadSDKSwapModule;

    constructor(props: SpreadSDKInitProps) {
        this.orderbook = new SpreadSDKOrderbookModule(props);
        this.swap = new SpreadSDKSwapModule(props);

        this.initialized = true;
    }

    public static create(props: SpreadSDKModuleInitProps): SpreadSDK {
        return new SpreadSDK(props);
    }

    public getSpread(): number {
        if (!this.initialized) {
            throw SpreadSDKError.NotInitialized();
        }

        return 1;
    }
}
