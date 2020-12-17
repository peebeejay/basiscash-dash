import React, { useContext } from 'react';
import { Banner } from './Banner';
import { DashboardState } from './DashboardProvider';

export const Dashboard = () => {
  const state = useContext(DashboardState);

  return (
    <div>
      {`BAC price: ${state.prices.bac}\n\n`}
      <br />
      {`BAS price: ${state.prices.bas}`}
      <br />
      {`BAC supply: ${state.tokenSupply.bac}`}
      <br />
      {`BAS supply: ${state.tokenSupply.bas}`}
      <Banner />
    </div>
  );
};
