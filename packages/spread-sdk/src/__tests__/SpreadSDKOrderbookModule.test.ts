import { SpreadSDK } from '../SpreadSDK';
import { SpreadSDKInitProps } from '../types';
import { getDefaultConfig } from '../utils';

describe('SpreadSDKOrderbookModule', () => {
    let spreadSDK: SpreadSDK | null = null;

    const mockConfig: SpreadSDKInitProps = {
        ...getDefaultConfig(),
        publicAddress: '',
        apiKey: '',
    };

    beforeEach(() => {
        spreadSDK = new SpreadSDK(mockConfig);
    });

    it('should be defined', () => {
        expect(spreadSDK).toBeDefined();
    });
});
