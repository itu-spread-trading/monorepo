import { SpreadSDK } from '../SpreadSDK';
import { SpreadSDKInitProps } from '../types';
import { getDefaultConfig } from '../utils';

describe('SpreadSDKOrderbookModule', () => {
    let spreadSDK: SpreadSDK | null = null;

    const mockConfig: SpreadSDKInitProps = {
        ...getDefaultConfig(),
        publicAddress: '',
    };

    beforeEach(() => {
        spreadSDK = new SpreadSDK(mockConfig);
    });

    it('should be defined', () => {
        expect(spreadSDK).toBeDefined();
    });

    it('should return all limit orders correctly', async () => {
        const limitOrders = await spreadSDK.orderbook.genLimitOrders();
        expect(limitOrders).toBeDefined();
        expect(limitOrders.length).toBeGreaterThan(0);
        expect(limitOrders[0].orderHash).toBeDefined();
        expect(limitOrders[0].data).toBeDefined();
    });
});
