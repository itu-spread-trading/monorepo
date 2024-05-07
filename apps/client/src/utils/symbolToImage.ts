import adaImage from '@/assets/tokens/ada.png';
import aptImage from '@/assets/tokens/apt.png';
import atomImage from '@/assets/tokens/atom.png';
import avaxImage from '@/assets/tokens/avax.png';
import bnbImage from '@/assets/tokens/bnb.png';
import btcImage from '@/assets/tokens/btc.png';
import dogeImage from '@/assets/tokens/doge.png';
import dotImage from '@/assets/tokens/dot.png';
import ethImage from '@/assets/tokens/eth.png';
import filImage from '@/assets/tokens/fil.png';
import linkImage from '@/assets/tokens/link.png';
import litecoinImage from '@/assets/tokens/litecoin.png';
import maticImage from '@/assets/tokens/matic.png';
import mkrImage from '@/assets/tokens/mkr.png';
import solImage from '@/assets/tokens/sol.png';
import trxImage from '@/assets/tokens/trx.png';
import uniImage from '@/assets/tokens/uni.png';
import usdcImage from '@/assets/tokens/usdc.png';
import xmrImage from '@/assets/tokens/xmr.png';
import xrpImage from '@/assets/tokens/xrp.png';
import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';
import { StaticImageData } from 'next/image';

export const symbolToImage = (
    symbol: SpreadSDKSupportedSymbols,
): StaticImageData => {
    switch (symbol) {
        case 'ADAUSDT':
            return adaImage;
        case 'APTUSDT':
            return aptImage;
        case 'ATOMUSDT':
            return atomImage;
        case 'AVAXUSDT':
            return avaxImage;
        case 'BNBUSDT':
            return bnbImage;
        case 'BTCUSDT':
            return btcImage;
        case 'DOGEUSDT':
            return dogeImage;
        case 'DOTUSDT':
            return dotImage;
        case 'ETHUSDT':
            return ethImage;
        case 'FILUSDT':
            return filImage;
        case 'LINKUSDT':
            return linkImage;
        case 'LTCUSDT':
            return litecoinImage;
        case 'MATICUSDT':
            return maticImage;
        case 'MKRUSDT':
            return mkrImage;
        case 'SOLUSDT':
            return solImage;
        case 'TRXUSDT':
            return trxImage;
        case 'UNIUSDT':
            return uniImage;
        case 'USDCUSDT':
            return usdcImage;
        case 'XMRUSDT':
            return xmrImage;
        case 'XRPUSDT':
            return xrpImage;
        default:
            throw new Error(`Symbol ${symbol} not supported`);
    }
};
