import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { commify } from 'ethers/lib/utils';
import { Data } from './DashboardProvider/state';
import { LargeHeader } from './typography/LargeHeader';
import { ListItem, Name, Value } from './typography/ListItem';
import { RightContainer, LeftContainer } from './typography/Section';
import { formatNumber } from '../utils';

type Props = {
  data: Data;
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: ${rem(800)}) {
    margin-right: ${rem(20)};
    margin-left: ${rem(20)};
  }
`;

const RowContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: ${rem(800)}) {
    flex-wrap: wrap;
  }
`;

export const BASMetrics = (props: Props) => {
  const {
    data: {
      tokenSupply: { basCirculating, basTotalSupply },
      staking: { basBoardroom, daibasUniswapBas },
    },
  } = props;

  const basInBoardroomPercent = (basBoardroom / basCirculating) * 100;
  const unstakedBasPercent =
    ((basCirculating - basBoardroom - daibasUniswapBas) / basCirculating) * 100;
  const basInDaiBasUniPoolPercent = (daibasUniswapBas / basCirculating) * 100;

  return (
    <Container>
      <LargeHeader>{'BAS Metrics'}</LargeHeader>
      <RowContainer>
        <LeftContainer>
          <ListItem>
            <Name>{'BAS in Boardroom:'}</Name>
            <Value>{`${formatNumber(basInBoardroomPercent, 2)}%`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Unstaked BAS:'}</Name>
            <Value>{`${formatNumber(unstakedBasPercent, 2)}%`}</Value>
          </ListItem>
        </LeftContainer>
        <RightContainer>
          <ListItem>
            <Name>{'BAS in DAI/BAS Pool'}</Name>
            <Value>{`${formatNumber(basInDaiBasUniPoolPercent, 2)}%`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Total BAS Supply'}</Name>
            <Value>{`${commify(basTotalSupply)}`}</Value>
          </ListItem>
        </RightContainer>
      </RowContainer>
    </Container>
  );
};
