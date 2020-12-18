import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { BasisCashLogo } from './Logo';

const Container = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${rem(25)} 0;
`;

const ContentLeft = styled.div``;

const ContentRight = styled.div`
  display: flex;
  flex-direction: row;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
`;

const Link = styled.a`
  font-weight: 700;
  color: purple;
  cursor: pointer;
  text-decoration: none;

  &:not(:last-child) {
    margin-right: ${rem(15)};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const BasisCash = styled(BasisCashLogo)`
  height: ${rem(30)};
  width: ${rem(30)};
  margin-right: ${rem(10)};
`;

const Name = styled.div`
  font-weight: 700;
`;

export const Navbar = () => {
  return (
    <Container>
      <ContentLeft>
        <LogoContainer>
          <BasisCash />
          <Name>{'Basis Cash'}</Name>
        </LogoContainer>
      </ContentLeft>
      <ContentRight>
        <Links>
          <Link href="https://basis.cash">app</Link>
          <Link href="https://docs.basis.cash/">docs</Link>
          <Link href="https://duneanalytics.com/donkhalil/basis-cash_1">analytics</Link>
          <Link href="https://app.uniswap.org/#/swap?inputCurrency=0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a&outputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f">
            trade
          </Link>
          <Link>wallet</Link>
        </Links>
      </ContentRight>
    </Container>
  );
};
