enum TokenNames {
  dai = 'dai',
  bac = 'bac',
  bas = 'bas',
}

export type Tokens = {
  [key in TokenNames]: TokenConfig;
};

export type TokenConfig = {
  symbol: string;
  contractAddress: string;
  decimals: number;
};

export type ApiData = {
  bab_spot: number;
  bab_supply: number;
  bac_spot: number;
  bac_total_supply: number;
  bac_twap: number;
  bas_spot: number;
  bas_total_supply: number;
  boardroom_bas: number;
  daibac_stakingpool_bas: number;
  daibas_stakingpool_bas: number;
  daibas_uniswap_bas: number;
  next_seignorage_epoch: number;
};
