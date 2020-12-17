import { Fetcher, Route, Token } from '@uniswap/sdk';
import { ethers } from 'ethers';
import { infuraConfig } from './secrets';
import { config } from './config';
import { tokens } from './constants';
import { TokenConfig } from './types';

export const apiGetTokenPriceFromUniswap = async (
  tokenConfig: TokenConfig,
): Promise<string | undefined> => {
  const provider = new ethers.providers.InfuraProvider('homestead', infuraConfig);

  const daiConfig = tokens.dai;
  const dai = new Token(config.chainId, daiConfig.contractAddress, daiConfig.decimals);
  const token = new Token(
    config.chainId,
    tokenConfig.contractAddress,
    tokenConfig.decimals,
  );

  try {
    const daiToToken = await Fetcher.fetchPairData(dai, token, provider);
    const priceInDAI = new Route([daiToToken], token);
    return priceInDAI.midPrice.toSignificant(3);
  } catch (err) {
    console.error(`Failed to fetch token price of ${tokenConfig.symbol}: ${err}`);
  }
};
