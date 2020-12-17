import { ChainId } from '@uniswap/sdk';

export type Config = {
  chainId: ChainId;
};

export const config: Config = {
  chainId: ChainId.MAINNET,
};
