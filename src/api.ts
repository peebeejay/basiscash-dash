import { Fetcher, Route, Token, ChainId } from '@uniswap/sdk';
import { ethers, Contract } from 'ethers';
import { infuraConfig } from './secrets';
import { config } from './config';
import { tokens } from './constants';
import { ApiData, TokenConfig } from './types';
import ERC20_ABI from './constants/ERC20_abi.json';
import { formatUnits } from 'ethers/lib/utils';

export const apiGetTokenPriceFromUniswap = async (
  tokenConfig: TokenConfig,
): Promise<string | undefined> => {
  const provider = new ethers.providers.InfuraProvider(ChainId.MAINNET, infuraConfig);

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

export const apiGetTotalSupply = async (
  token: TokenConfig,
): Promise<string | undefined> => {
  const provider = new ethers.providers.InfuraProvider(ChainId.MAINNET, infuraConfig);
  const contract = new Contract(token.contractAddress, ERC20_ABI, provider);

  try {
    const supply = await contract.totalSupply();
    return Number(formatUnits(supply, token.decimals)).toFixed(0);
  } catch (err) {
    console.error(`Failed to fetch supply of token ${token.symbol}`);
  }
};

export const apiGetData = async (): Promise<ApiData | undefined> => {
  const uri = 'https://basiscash-server-nextjs.junto2015.vercel.app/api/data';

  try {
    const response = await fetch(uri, { method: 'GET' });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    /* Contains sample data */
    return { ...data, bac_twap: 1.11 };
    // return data;
  } catch (error) {
    console.warn('Failed to fetch dashboard data');
  }
};
