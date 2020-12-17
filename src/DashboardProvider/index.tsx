import React, { FC, useState, createContext, useMemo, useEffect } from 'react';
import { apiGetTokenPriceFromUniswap } from '../api';
import { State, createInitialState, Dispatcher } from './state';
import { tokens } from '../constants';

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
    const bacPrice = await apiGetTokenPriceFromUniswap(tokens.bac);
    updateState({
      ...state,
      prices: {
        ...state.prices,
        bac: bacPrice ?? null,
      },
    });
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
