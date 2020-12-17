enum TokenNames {
  dai = 'dai',
  bac = 'bac',
}

export type Tokens = {
  [key in TokenNames]: TokenConfig;
};

export type TokenConfig = {
  symbol: string;
  contractAddress: string;
  decimals: number;
};
