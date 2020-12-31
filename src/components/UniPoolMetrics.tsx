import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { BigNumber } from 'bignumber.js';
import Tooltip from '@material-ui/core/Tooltip';
import { Data } from './DashboardProvider/state';
import { LargeHeader } from './typography/LargeHeader';
import { SmallHeader } from './typography/SmallHeader';
import { ListItem, Name, Value } from './typography/ListItem';
import { formatNumber } from '../utils';
import { commify } from 'ethers/lib/utils';
import { HOURS_IN_DAY, SECONDS_IN_HOUR } from '../constants';
import {
  LeftContainer,
  RightContainer,
  RowContainer,
  Container as ContainerComponent,
} from './typography/Section';
import { SentimentColor } from './typography/SentimentColor';

type Props = {
  data: Data;
};

const StyledLargeHeader = styled(LargeHeader)`
  margin-bottom: ${rem(5)};
`;

const StyledSmallHeader = styled(SmallHeader)`
  margin-top: ${rem(10)};
  margin-bottom: ${rem(0)};
`;

const Container = styled(ContainerComponent)`
  @media (max-width: ${rem(800)}) {
    margin-bottom: ${rem(25)};
  }
`;

const TipContent = styled.span`
  font-size: ${rem(12)};
  font-weight: 600;
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
        <LeftContainer>
          <ListItem>
            <StyledSmallHeader>{'DAI/BAS'}</StyledSmallHeader>
          </ListItem>
          <ListItem>
            <Name>{'TVL:'}</Name>
            <Value>
              <SentimentColor value={basDaiTvl}>{`$${formatNumber(
                basDaiTvl,
                0,
              )} DAI`}</SentimentColor>
            </Value>
          </ListItem>
          <Tooltip
            placement="top-start"
            arrow
            title={<TipContent>{'Daily and Annual Yields'}</TipContent>}
          >
            <ListItem>
              <Name>{'Yield (D/Y)*:'}</Name>
              <Value>
                <SentimentColor value={basDaiDailyReturn.toNumber()}>{`${formatNumber(
                  basDaiDailyReturn.toNumber(),
                  2,
                )}% / ${formatNumber(
                  basDaiDailyReturn.multipliedBy(365).toNumber(),
                  0,
                )}%`}</SentimentColor>
              </Value>
            </ListItem>
          </Tooltip>
          <ListItem>
            <Name>{'Rewards Remaining:'}</Name>
            <Value>{`${commify(daibasStakingpoolBas)} BAS`}</Value>
          </ListItem>
        </LeftContainer>

        <RightContainer>
          <ListItem>
            <StyledSmallHeader>{'BAC/DAI'}</StyledSmallHeader>
          </ListItem>
          <ListItem>
            <Name>{'TVL:'}</Name>
            <Value>
              <SentimentColor value={bacDaiTvl}>{`$${formatNumber(
                bacDaiTvl,
                0,
              )} DAI`}</SentimentColor>
            </Value>
          </ListItem>
          <Tooltip
            placement="top-start"
            arrow
            title={<TipContent>{'Daily and Annual Yields'}</TipContent>}
          >
            <ListItem>
              <Name>{'Yield (D/Y)*:'}</Name>
              <Value>
                <SentimentColor value={bacDaiDailyReturn.toNumber()}>{`${formatNumber(
                  bacDaiDailyReturn.toNumber(),
                  2,
                )}% / ${formatNumber(
                  bacDaiDailyReturn.multipliedBy(365).toNumber(),
                  0,
                )}%`}</SentimentColor>
              </Value>
            </ListItem>
          </Tooltip>
          <ListItem>
            <Name>{'Rewards Remaining:'}</Name>
            <Value>{`${commify(daibacStakingpoolBas)} BAS`}</Value>
          </ListItem>
        </RightContainer>
      </RowContainer>
    </Container>
  );
};
