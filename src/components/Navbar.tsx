import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { BasisCashLogo as BasisCashLogoComponent } from './Logo';

const Container = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${rem(25)} 0;
`;

const ContentLeft = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.headerColor};
  transition: 200ms color ease;

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

const ContentRight = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${rem(600)}) {
    display: none;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
`;

const Link = styled.a`
  font-weight: 700;
  color: ${({ theme }) => theme.headerColor};
  cursor: pointer;
  text-decoration: none;
  transition: 250ms color ease;

  &:not(:last-child) {
    margin-right: ${rem(15)};
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  @media (max-width: ${rem(800)}) {
    margin-left: ${rem(10)};
  }
`;

const BasisCashLogo = styled(BasisCashLogoComponent)`
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
      <ContentLeft target={'_blank'} href="https://basis.cash">
        <LogoContainer>
          <BasisCashLogo />
          <Name>{'Basis Cash'}</Name>
        </LogoContainer>
      </ContentLeft>
      <ContentRight>
        <Links>
          <Link target={'_blank'} href="https://basis.cash">
            app
          </Link>
          <Link target={'_blank'} href="https://docs.basis.cash/">
            docs
          </Link>
          <Link
            target={'_blank'}
            href={
              'https://dex.vision/?ticker=UniswapV2:BASDAI-0x0379dA7a5895D13037B6937b109fA8607a659ADF&interval=1/'
            }
          >
            charts
          </Link>
          <Link target={'_blank'} href="https://duneanalytics.com/donkhalil/basis-cash_1">
            analytics
          </Link>
          <Link
            target={'_blank'}
            href={
              'https://app.uniswap.org/#/swap?inputCurrency=0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a&outputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f'
            }
          >
            trade
          </Link>
          <Link>wallet</Link>
        </Links>
      </ContentRight>
    </Container>
  );
};
