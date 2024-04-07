export class SpreadSDKError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SpreadSDKError';
    }

    public static NotInitialized(): SpreadSDKError {
        return new SpreadSDKError('SpreadSDK is not initialized');
    }
}
