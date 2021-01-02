import { Dispatch, SetStateAction } from 'react';
import BigNumber from 'bignumber.js';

export type State = {
  data: Data | null;
  balances: Balances | null;
};

export type Data = {
  prices: {
    /* BAC Spot price in USD (DAI) */
    bacSpot: number;
    /* BAC time-weighted average price */
    bacTwap: number;
    /* BAS Spot price in USD (DAI) */
    basSpot: number;
    /* BAB Spot Price in USD (DAI) */
    babSpot: number;
  };
  tokenSupply: {
    bac: number;
    basCirculating: number;
    basTotalSupply: number;
    bab: number;
  };
  staking: {
    /* Amount of total BAS staked in the boardroom contract */
    basBoardroom: number;
    /* BAS rewards for staking in BAC/DAI Uniswap pool */
    daibacStakingpoolBas: number;
    /* BAS rewards for staking in DAI/BAS Uniswap pool */
    daibasStakingpoolBas: number;
    /* BAS staked within the DAI/BAS Uniswap pool */
    daibasUniswapBas: number;
    /* DAI staked within the DAI/BAS Uniswap pool */
    daibasUniswapDai: number;
    /* BAC staked within the DAI/BAC Uniswap pool */
    daibacUniswapBac: number;
    /* DAI staked within the DAI/BAC Uniswap pool */
    daibacUniswapDai: number;
  };
  epoch: {
    nextEpochTimestamp: number;
  };
  rewards: {
    daibacRewardRatePerSec: BigNumber;
    daibasRewardRatePerSec: BigNumber;
  };
};

export type Balances = {
  bac: number;
  bas: number;
  bab: number;
  dai: number;
};

export interface Dispatcher {
  updateState: Dispatch<SetStateAction<State>>;
  connectToWallet: () => void;
}

export const createInitialState = (): State => ({
  data: null,
  balances: null,
});
