import React, { useContext } from 'react';
import styled from 'styled-components';
import { Banner } from './Banner';
import { Helmet } from './Helmet';
import { DashboardState } from './DashboardProvider';
import { BACStats } from './BACStats';
import { PriceAndSupply } from './SupplyAndPrice';
import { BASMetrics } from './BASMetrics';
import { UniPoolMetrics } from './UniPoolMetrics';
import { WalletBalance } from './WalletBalance';

export const Container = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-grow: 2;
  transition: 250ms background-color ease;
  background-color: ${({ theme }) => theme.backgroundColor};
  flex-direction: column;
  width: 100%;
`;

export const Dashboard = () => {
  const { data, balances } = useContext(DashboardState);

  if (data === null) {
    return null;
  }

  return (
    <Container>
      <Banner data={data} />
      <BACStats data={data} />
      <PriceAndSupply data={data} />
      <BASMetrics data={data} />
      <UniPoolMetrics data={data} />
      {balances && <WalletBalance data={data} balances={balances} />}
      <Helmet data={data} />
    </Container>
  );
};
