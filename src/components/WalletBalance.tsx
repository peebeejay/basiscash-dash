import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { LargeHeader } from './typography/LargeHeader';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: ${rem(15)}; // temp
`;

const StyledLargeHeader = styled(LargeHeader)`
  margin-bottom: ${rem(5)};
  margin-top: ${rem(10)};
`;

export const WalletBalance = () => {
  return (
    <Container>
      <StyledLargeHeader>{'Token Balances (soon)'}</StyledLargeHeader>
    </Container>
  );
};
