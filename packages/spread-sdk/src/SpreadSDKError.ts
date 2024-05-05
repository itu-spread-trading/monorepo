export class SpreadSDKError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SpreadSDKError';
    }

    public static NotInitialized(): SpreadSDKError {
        return new SpreadSDKError('SpreadSDK is not initialized');
    }

    public static CouldNotGetSpread(): SpreadSDKError {
        return new SpreadSDKError('Could not get spread data');
    }

    public static CouldNotGetStandardDeviation(): SpreadSDKError {
        return new SpreadSDKError('Could not get spread standard deviation');
    }
}
