import React, { FC, useState, createContext, useMemo, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { apiGetData } from '../../api';
import { State, createInitialState, Dispatcher } from './state';
import { FETCH_DATA_INTERVAL } from '../../constants';
import { getCirculatingBasSupply } from '../../utils';

type Props = {
  children: React.ReactNode;
};

export const DashboardDispatch = createContext<Dispatcher>({} as Dispatcher);
export const DashboardState = createContext<State>({} as State);

const DashboardProvider: FC<Props> = (props) => {
  const [state, updateState] = useState<State>(createInitialState());

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, FETCH_DATA_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const data = await apiGetData();

    if (data) {
      updateState({
        data: {
          prices: {
            bacSpot: data.bac_spot,
            bacTwap: data.bac_twap,
            basSpot: data.bas_spot,
            babSpot: data.bab_spot,
          },
          tokenSupply: {
            bac: data.bac_total_supply,
            basCirculating: getCirculatingBasSupply(
              data.bas_total_supply,
              data.daibas_stakingpool_bas,
              data.daibac_stakingpool_bas,
            ),
            basTotalSupply: data.bas_total_supply,
            bab: data.bab_supply,
            bacTreasury: data.treasury_bac,
          },
          staking: {
            basBoardroom: data.boardroom_bas,
            daibacStakingpoolBas: data.daibac_stakingpool_bas,
            daibasStakingpoolBas: data.daibas_stakingpool_bas,
            daibasUniswapBas: data.daibas_uniswap_bas,
            daibasUniswapDai: data.daibas_uniswap_dai,
            daibacUniswapBac: data.daibac_uniswap_bac,
            daibacUniswapDai: data.daibac_uniswap_dai,
          },
          epoch: {
            nextEpochTimestamp: data.next_seignorage_epoch,
          },
          rewards: {
            daibacRewardRatePerSec: new BigNumber(data.daibac_reward_rate_per_sec),
            daibasRewardRatePerSec: new BigNumber(data.daibas_reward_rate_per_sec),
          },
        },
      });
    }
  };

  const dispatcher = useMemo(() => {
    return {
      updateState,
    };
  }, []);

  return (
    <DashboardDispatch.Provider value={dispatcher}>
      <DashboardState.Provider value={state}>{props.children}</DashboardState.Provider>
    </DashboardDispatch.Provider>
  );
};

export default DashboardProvider;
