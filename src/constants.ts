import { Tokens } from './types';

/* Numerical Constants */
export const SEIGNORAGE_EVENTS_PER_DAY = 1;
export const DAYS_IN_YEAR = 365;
export const HOURS_IN_DAY = 24;
export const SECONDS_IN_HOUR = 3600;
export const MS_IN_DAY = SECONDS_IN_HOUR * HOURS_IN_DAY * 1000;

/* Application Constants */
export const FETCH_DATA_INTERVAL = 20000; // milliseconds
export const INFLATION_THRESHOLD_PRICE = 1.05;
export const DEFLATION_THRESHOLD_PRICE = 0.95;
export const CONFETTI_DISPLAY_TIME = 8000;

export const tokens: Tokens = {
  dai: {
    symbol: 'DAI',
    contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
  },
  bac: {
    symbol: 'BAC',
    contractAddress: '0x3449FC1Cd036255BA1EB19d65fF4BA2b8903A69a',
    decimals: 18,
  },
  bas: {
    symbol: 'BAS',
    contractAddress: '0xa7ED29B253D8B4E3109ce07c80fc570f81B63696',
    decimals: 18,
  },
};
