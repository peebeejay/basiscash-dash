import { commify } from 'ethers/lib/utils';

/*
 * Gets the number of projected minted BAC tokens based on the issuance
 * equation published in https://docs.basis.cash/
 */
export const getSupplyIncrease = (bacSupply: number, bacTwap: number) =>
  commify((bacSupply * (bacTwap - 1)).toFixed(2));
