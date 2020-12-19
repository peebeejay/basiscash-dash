import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Data } from './DashboardProvider/state';
import { LargeHeader } from './typography/LargeHeader';
import { SmallHeader } from './typography/SmallHeader';
import { ListItem, Name, Value } from './typography/ListItem';
import { formatNumber } from '../utils';
import { commify } from 'ethers/lib/utils';

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

const StyledLargeHeader = styled(LargeHeader)`
  margin-bottom: ${rem(5)};
`;

const StyledSmallHeader = styled(SmallHeader)`
  margin-top: ${rem(10)};
`;

export const UniPoolMetrics = (props: Props) => {
  const {
    data: {
      staking: { daibasStakingpoolBas, daibacStakingpoolBas },
    },
  } = props;

  return (
    <Container>
      <StyledLargeHeader>{'Uniswap Pool Metrics'}</StyledLargeHeader>
      <RowContainer>
        <RightContainer>
          <ListItem>
            <StyledSmallHeader>{'DAI/BAS'}</StyledSmallHeader>
          </ListItem>
          <ListItem>
            <Name>{'TVL:'}</Name>
            <Value>{`$${formatNumber(4500300, 2)} DAI`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Returns (Daily):'}</Name>
            <Value>{`${formatNumber(3.47, 2)}%`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Returns (Yearly):'}</Name>
            <Value>{`${formatNumber(3.47 * 365, 2)}%`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Rewards Remaining:'}</Name>
            <Value>{`${commify(daibasStakingpoolBas)} BAS`}</Value>
          </ListItem>
        </RightContainer>

        <LeftContainer>
          <ListItem>
            <StyledSmallHeader>{'BAC/DAI'}</StyledSmallHeader>
          </ListItem>
          <ListItem>
            <Name>{'TVL:'}</Name>
            <Value>{`$${formatNumber(41600300, 2)} DAI`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Returns (Daily):'}</Name>
            <Value>{`${formatNumber(1.75, 2)}%`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Returns (Yearly):'}</Name>
            <Value>{`${formatNumber(1.75 * 365, 2)}%`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Rewards Remaining:'}</Name>
            <Value>{`${commify(daibacStakingpoolBas)} BAS`}</Value>
          </ListItem>
        </LeftContainer>
      </RowContainer>
    </Container>
  );
};
