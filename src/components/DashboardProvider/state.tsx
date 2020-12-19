import { Dispatch, SetStateAction } from 'react';

export type State = {
  data: Data | null;
};

export type Data = {
  prices: {
    /* BAC Spot price in USD (DAI) */
    bacSpot: number;
    /* BAC time-weighted average price */
    bacTwap: number;
    /* BAS Spot price in USD (DAI) */
    basSpot: number;
  };
  tokenSupply: {
    bac: number;
    basCirculating: number;
    basTotalSupply: number;
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
  };
  epoch: {
    nextEpochTimestamp: number;
  };
};

export interface Dispatcher {
  updateState: Dispatch<SetStateAction<State>>;
}

export const createInitialState = (): State => ({
  data: null,
});
