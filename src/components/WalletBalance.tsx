import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { LargeHeader } from './typography/LargeHeader';
import { Data, Balances } from './DashboardProvider/state';

type Props = {
  data: Data;
  balances: Balances;
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledLargeHeader = styled(LargeHeader)`
  margin-bottom: ${rem(5)};
  margin-top: ${rem(10)};
`;

export const WalletBalance = (props: Props) => {
  console.log(props);

  return (
    <Container>
      <StyledLargeHeader>{'Token Balances'}</StyledLargeHeader>
    </Container>
  );
};
