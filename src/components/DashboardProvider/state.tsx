import { Dispatch, SetStateAction } from 'react';

export type State = {
  data: Data | null;
};

export type Data = {
  prices: {
    /* BAC Spot price in USD (DAI) */
    bac: number;
    /* BAC time-weighted average price */
    bacTwap: number;
    /* BAS Spot price in USD (DAI) */
    bas: number;
  };
  tokenSupply: {
    bac: number;
    bas: number;
  };
  staking: {
    /* Amount of total BAS staked in the boardroom contract */
    basBoardroom: number;
  };
};

export interface Dispatcher {
  updateState: Dispatch<SetStateAction<State>>;
}

export const createInitialState = (): State => ({
  data: null,
});
