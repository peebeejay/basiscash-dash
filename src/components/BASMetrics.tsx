import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Data } from './DashboardProvider/state';
import { LargeHeader } from './typography/LargeHeader';
import { ListItem, Name, Value } from './typography/ListItem';
import { formatNumber } from '../utils';

type Props = {
  data: Data;
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RowContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${rem(15)};
  flex: 1;
`;

const RightContainer = styled(SectionContainer)`
  margin-right: ${rem(30)};
`;

const LeftContainer = styled(SectionContainer)`
  margin-left: ${rem(30)};
`;

export const BASMetrics = (props: Props) => {
  const {
    data: {
      tokenSupply: { basCirculating },
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
        <RightContainer>
          <ListItem>
            <Name>{'BAS in Boardroom:'}</Name>
            <Value>{`${formatNumber(basInBoardroomPercent, 2)}%`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Unstaked BAS:'}</Name>
            <Value>{`${formatNumber(unstakedBasPercent, 2)}%`}</Value>
          </ListItem>
        </RightContainer>
        <LeftContainer>
          <ListItem>
            <Name>{'BAS in DAI/BAS Pool'}</Name>
            <Value>{`${formatNumber(basInDaiBasUniPoolPercent, 2)}%`}</Value>
          </ListItem>
        </LeftContainer>
      </RowContainer>
    </Container>
  );
};
