import React, { FC, useState, createContext, useMemo, useEffect } from 'react';
import { apiGetData } from '../../api';
import { State, createInitialState, Dispatcher } from './state';

type Props = {
  children: React.ReactNode;
};

export const DashboardDispatch = createContext<Dispatcher>({} as Dispatcher);
export const DashboardState = createContext<State>({} as State);

const DashboardProvider: FC<Props> = (props) => {
  const [state, updateState] = useState<State>(createInitialState());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await apiGetData();

    if (data) {
      updateState({
        data: {
          prices: {
            bac: data.bac_spot,
            bacTwap: data.bac_twap,
            bas: data.bas_spot,
          },
          tokenSupply: {
            bac: data.bac_total_supply,
            bas: data.bas_total_supply,
          },
          staking: {
            basBoardroom: data.boardroom_bas,
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
