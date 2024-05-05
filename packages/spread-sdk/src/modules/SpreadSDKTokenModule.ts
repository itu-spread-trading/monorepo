import {
    ISpreadSDKTokenModule,
    SpreadSDKInitProps,
    SpreadSDKModuleInitProps,
    SpreadSDKSupportedSymbols,
    SpreadSDKTokenPair,
} from '../types';
import Axios, { AxiosInstance } from 'axios';
import {
    formatSpreadSDKSymbolTo1inchToken,
    getApiUrlOrOverride,
} from '../utils';

export class SpreadSDKTokenModule implements ISpreadSDKTokenModule {
    public props: SpreadSDKModuleInitProps;

    public baseUrl: string;
    protected apiUrl: string;
    private axios1Inch: AxiosInstance;

    constructor(props: SpreadSDKModuleInitProps) {
        this.init(props);
    }

    public init(props: SpreadSDKInitProps): void {
        this.props = props;

        // Api Configuration
        this.baseUrl = `https://api.1inch.dev/token/v1.2/${props.chainId}/`;
        this.apiUrl = getApiUrlOrOverride(props.apiUrlOverride);
        this.axios1Inch = Axios.create({
            baseURL: this.baseUrl,
        });
    }

    public async genTokenPair(
        symbol: SpreadSDKSupportedSymbols,
    ): Promise<SpreadSDKTokenPair> {
        const tokenName = formatSpreadSDKSymbolTo1inchToken(symbol);

        const relatedTokenResults = await this.axios1Inch.get('/search', {
            params: {
                query: tokenName,
                chain_id: this.props.chainId,
            },
        });

        const usdtTokenResults = await this.axios1Inch.get('/search', {
            params: {
                query: 'USDT',
                chain_id: this.props.chainId,
            },
        });

        const relatedToken = relatedTokenResults.data.tokens[0];
        const usdtToken = usdtTokenResults.data.tokens[0];

        return {
            USDT: usdtToken.address,
            TOKEN: relatedToken.address,
        };
    }
}
