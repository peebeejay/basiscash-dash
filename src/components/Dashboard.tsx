import React, { useContext } from 'react';
import styled from 'styled-components';
import { Banner } from './Banner';
import { DashboardState } from './DashboardProvider';
import { BACStats } from './BACStats';

export const Container = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-grow: 2;
  background-color: white; // noctiz azeureus blue
  flex-direction: column;
  width: 100%;
`;

export const Dashboard = () => {
  const { data } = useContext(DashboardState);

  if (data === null) {
    return null;
  }

  return (
    <Container>
      <Banner data={data} />
      <BACStats data={data} />
    </Container>
  );
};
