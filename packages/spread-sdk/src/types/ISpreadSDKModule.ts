import { AxiosInstance } from 'axios';

import { SpreadSDKModuleInitProps } from '.';

export interface ISpreadSDKModule {
    /**
     * Base URL of the module API
     */
    baseUrl: string;
    /**
     * Props of the module
     */
    props: SpreadSDKModuleInitProps;

    /**
     * URL of the Spread SDK Indexer API
     */
    apiUrl: string;

    /**
     * Axios instance for Spread SDK API
     */
    axiosSpread: AxiosInstance;

    /**
     * Axios instance for 1inch SDK
     */
    axios1Inch: AxiosInstance;

    /**
     * @dev initialize the module with given parameters
     * @param props - The required metadata to initialize the module
     */
    init(props: SpreadSDKModuleInitProps): void;
}
