import { commify } from 'ethers/lib/utils';
import { MS_IN_DAY, SEIGNORAGE_EVENTS_PER_DAY } from './constants';
import BigNumber from 'bignumber.js';
import { BigNumber as BNEthers } from 'ethers';
import { DateTime } from 'luxon';

/* Only use if decimals don't matter */
export const formatValue = (value: number) => commify(value.toFixed(2));

/* Uses native JS function instead */
export const formatNumber = (val: number, decimals: number = 2) =>
  Number(val).toLocaleString('en', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const getSupplyIncreaseRaw = (bacSupply: number, bacTwap: number): number =>
  bacSupply * (bacTwap - 1);

/*
 * Gets the number of projected minted BAC tokens based on the issuance
 * equation published in https://docs.basis.cash/
 */
export const getSupplyIncrease = (bacSupply: number, bacTwap: number) =>
  getSupplyIncreaseRaw(bacSupply, bacTwap);

/* Gets the amount of BAC returned per issued BAS share staked in the boardroom */
export const getReturnPerBas = (
  bacSupply: number,
  bacTwap: number,
  stakedBasInBoardroom: number,
) => getSupplyIncreaseRaw(bacSupply, bacTwap) / stakedBasInBoardroom;

/* Gets the return in USD (DAI) terms per BAS based on the next expansion */
export const getBasReturnDaily = (
  bacPrice: number,
  bacReturnPerBas: number,
  basPrice: number,
) => ((bacReturnPerBas * bacPrice) / basPrice) * SEIGNORAGE_EVENTS_PER_DAY;

/* Calculate total cirulating BAS supply */
export const getCirculatingBasSupply = (
  basTotalSupply: number,
  basDaiTreasuryRewards: number,
  bacDaiTreasuryRewards: number,
) => basTotalSupply - basDaiTreasuryRewards - bacDaiTreasuryRewards;

export const getNumFromBNEthers = (bigNumEthers: BNEthers): number => {
  const divisor1e18 = new BigNumber('1e18');
  const bigNum = new BigNumber(bigNumEthers.toString());

  return bigNum.dividedBy(divisor1e18).toNumber();
};

export const getMsToSeignorage = (): number =>
  MS_IN_DAY - (DateTime.utc().toMillis() % MS_IN_DAY);
