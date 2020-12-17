import React, { useContext } from 'react';
import { Banner } from './Banner';
import { DashboardState } from './DashboardProvider';

export const Dashboard = () => {
  const state = useContext(DashboardState);

  return (
    <div>
      {`Here is the BAC price: ${state.prices.bac}`}
      <Banner />
    </div>
  );
};
