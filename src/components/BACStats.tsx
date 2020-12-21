import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Data } from './DashboardProvider/state';
import { commify } from 'ethers/lib/utils';
import { DateTime, Interval } from 'luxon';
import { formatNumber } from '../utils';
import { SmallHeader } from './typography/SmallHeader';

type Props = {
  data: Data;
};

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${rem(10)};
  transition: 250ms color ease;
  color: ${({ theme }) => theme.textColor};

  @media (max-width: ${rem(800)}) {
    flex-wrap: wrap;
    margin-right: ${rem(20)};
    margin-left: ${rem(20)};
  }
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: ${rem(800)}) {
    flex: 50%;
  }
`;

const DataValue = styled.span`
  font-size: ${rem(24)};
  text-align: left;

  @media (max-width: ${rem(800)}) {
    font-size: ${rem(20)};
  }
`;

export const BACStats = (props: Props) => {
  const {
    data: { prices, tokenSupply },
  } = props;

  const [countdown, setCountdown] = useState<string>('');

  /* This hook is used to generate a string representing the duration between now
   * and the next seignorage event 00:00 UTC
   */
  useEffect(() => {
    const utc = DateTime.utc();
    const nextEpochTime = DateTime.fromObject({
      year: utc.year,
      month: utc.month,
      day: utc.day,
      hour: 0,
      zone: 'utc',
    }).plus({ day: 1 });

    const getCountdown = () => {
      const difference = Interval.fromDateTimes(
        DateTime.local(),
        DateTime.fromSeconds(nextEpochTime.toSeconds()),
      );

      setCountdown(difference.toDuration().toFormat('hh:mm:ss'));
    };

    getCountdown();
    const interval = setInterval(getCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <GridItem>
        <SmallHeader>{'Next Epoch'}</SmallHeader>
        <DataValue>{countdown}</DataValue>
      </GridItem>
      <GridItem>
        <SmallHeader>{'BAC Spot Price'}</SmallHeader>
        <DataValue>{`$${formatNumber(prices.bacSpot, 3)} DAI`}</DataValue>
      </GridItem>
      <GridItem>
        <SmallHeader>{'BAC TWAP Price'}</SmallHeader>
        <DataValue>{`$${formatNumber(prices.bacTwap, 3)} DAI`}</DataValue>
      </GridItem>
      <GridItem>
        <SmallHeader>{'BAC Supply'}</SmallHeader>
        <DataValue>{`${commify(tokenSupply.bac)}`}</DataValue>
      </GridItem>
    </Container>
  );
};
