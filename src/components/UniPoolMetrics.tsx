import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { BigNumber } from 'bignumber.js';
import { Data } from './DashboardProvider/state';
import { LargeHeader } from './typography/LargeHeader';
import { SmallHeader } from './typography/SmallHeader';
import { ListItem, Name, Value } from './typography/ListItem';
import { formatNumber } from '../utils';
import { commify } from 'ethers/lib/utils';
import { HOURS_IN_DAY, SECONDS_IN_HOUR } from '../constants';

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
  margin-bottom: ${rem(5)};
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
  margin-bottom: ${rem(0)};
`;

export const UniPoolMetrics = (props: Props) => {
  const {
    data: {
      prices: { bacSpot, basSpot },
      staking: {
        daibasStakingpoolBas,
        daibacStakingpoolBas,
        daibasUniswapBas,
        daibasUniswapDai,
        daibacUniswapBac,
        daibacUniswapDai,
      },
      rewards: { daibacRewardRatePerSec, daibasRewardRatePerSec },
    },
  } = props;

  const basDaiTvl = daibasUniswapBas * basSpot + daibasUniswapDai;
  const bacDaiTvl = daibacUniswapBac * bacSpot + daibacUniswapDai;

  const divisor1e18 = new BigNumber('1e18');

  const basDaiDailyReturn = daibasRewardRatePerSec
    .dividedBy(divisor1e18)
    .multipliedBy(SECONDS_IN_HOUR * HOURS_IN_DAY)
    .multipliedBy(100)
    .multipliedBy(basSpot)
    .dividedBy(basDaiTvl);

  const bacDaiDailyReturn = daibacRewardRatePerSec
    .dividedBy(divisor1e18)
    .multipliedBy(SECONDS_IN_HOUR * HOURS_IN_DAY)
    .multipliedBy(100)
    .multipliedBy(basSpot)
    .dividedBy(bacDaiTvl);

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
            <Value>{`$${formatNumber(basDaiTvl, 2)} DAI`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Returns (Daily):'}</Name>
            <Value>{`${formatNumber(basDaiDailyReturn.toNumber(), 2)}%`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Returns (Yearly):'}</Name>
            <Value>{`${formatNumber(
              basDaiDailyReturn.multipliedBy(365).toNumber(),
              2,
            )}%`}</Value>
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
            <Value>{`$${formatNumber(bacDaiTvl, 2)} DAI`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Returns (Daily):'}</Name>
            <Value>{`${formatNumber(bacDaiDailyReturn.toNumber(), 2)}%`}</Value>
          </ListItem>
          <ListItem>
            <Name>{'Returns (Yearly):'}</Name>
            <Value>{`${formatNumber(
              bacDaiDailyReturn.multipliedBy(365).toNumber(),
              2,
            )}%`}</Value>
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
