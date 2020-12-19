import React, { FC, useState, createContext, useMemo, useEffect } from 'react';
import { apiGetData } from '../../api';
import { State, createInitialState, Dispatcher } from './state';
import { FETCH_DATA_INTERVAL } from '../../constants';

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
            basCirculating: data.bas_total_supply,
            basTotalSupply: data.bas_total_supply,
            bab: data.bab_supply,
          },
          staking: {
            basBoardroom: data.boardroom_bas,
            daibacStakingpoolBas: data.daibac_stakingpool_bas,
            daibasStakingpoolBas: data.daibas_stakingpool_bas,
            daibasUniswapBas: data.daibas_uniswap_bas,
          },
          epoch: {
            nextEpochTimestamp: data.next_seignorage_epoch,
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
