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

    public static CouldNotGetOrders(): SpreadSDKError {
        return new SpreadSDKError('Could not get orders');
    }

    public static CouldNotGetOrder(): SpreadSDKError {
        return new SpreadSDKError('Could not get order');
    }

    public static CouldNotUpdateOrder(): SpreadSDKError {
        return new SpreadSDKError('Could not update order');
    }

    public static CouldNotCreateOrder(): SpreadSDKError {
        return new SpreadSDKError('Could not create order');
    }
}
