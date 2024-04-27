import { SpreadSDKModuleInitProps } from '.';

export interface ISpreadSDKModule {
    /**
     * @dev initialize the module with given parameters
     * @param props - The required metadata to initialize the module
     */
    init(props: SpreadSDKModuleInitProps): void;
}
