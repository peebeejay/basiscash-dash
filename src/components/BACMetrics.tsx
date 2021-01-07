import React from 'react';
import { Data } from './DashboardProvider/state';
import { LargeHeader } from './typography/LargeHeader';
import { ListItem, Name, Value } from './typography/ListItem';
import {
  RightContainer,
  LeftContainer,
  RowContainer,
  Container,
} from './typography/Section';
import { formatNumber } from '../utils';
import { SentimentColor } from './typography/SentimentColor';

type Props = {
  data: Data;
};

export const BACMetrics = (props: Props) => {
  const {
    data: {
      tokenSupply: { bac, bacTreasury },
      staking: { daibacUniswapBac },
    },
  } = props;

  const bacTreasuryPercent = (bacTreasury / bac) * 100;
  const unstakedBacPercent = ((bac - bacTreasury - daibacUniswapBac) / bac) * 100;
  const bacInDaiBacUniPoolPercent = (daibacUniswapBac / bac) * 100;

  return (
    <Container>
      <LargeHeader>{'BAC Metrics'}</LargeHeader>
      <RowContainer>
        <LeftContainer>
          <ListItem>
            <Name>{'Treasury BAC:'}</Name>
            <Value>
              <SentimentColor value={bacTreasury}>{`${formatNumber(
                bacTreasury,
                0,
              )}`}</SentimentColor>
            </Value>
          </ListItem>
          <ListItem>
            <Name>{'Unstaked BAC:'}</Name>
            <Value>
              <SentimentColor value={unstakedBacPercent}>{`${formatNumber(
                unstakedBacPercent,
                2,
              )}%`}</SentimentColor>
            </Value>
          </ListItem>
        </LeftContainer>

        <RightContainer>
          <ListItem>
            <Name>{'BAC in BAC/DAI Pool:'}</Name>
            <Value>
              <SentimentColor value={bacInDaiBacUniPoolPercent}>{`${formatNumber(
                bacInDaiBacUniPoolPercent,
                2,
              )}%`}</SentimentColor>
            </Value>
          </ListItem>
        </RightContainer>
      </RowContainer>
    </Container>
  );
};
