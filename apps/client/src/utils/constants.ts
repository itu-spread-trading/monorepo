import { ERC20ABI } from '@/utils/erc20abi';
import { Interface } from 'ethers/lib/utils';

export const TREASURY_ADDRESS = '0xff496d93963F157Fe15734DbC8853D3bFa50120F';
export const erc20Interface = new Interface(ERC20ABI);
