import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import {
  getSupplyIncrease,
  getReturnPerBas,
  getBasReturnDaily,
  formatValue,
} from '../utils';
import { Data } from './DashboardProvider/state';
import { DAYS_IN_YEAR } from '../constants';

type Props = {
  data: Data;
};

const Container = styled.section`
  text-align: left;
  background-color: purple;
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: ${rem(15)};
  padding: ${rem(60)} ${rem(50)} ${rem(50)};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NextEpoch = styled.div`
  font-size: ${rem(18)};
  margin-bottom: ${rem(5)};
  font-weight: 500;
`;

const Supply = styled.div`
  font-size: ${rem(22)};
  font-weight: 600;
  // margin-bottom: ${rem(10)};
  line-height: ${rem(30)};
`;

const Return = styled.div`
  font-size: ${rem(18)};
  font-weight: 500;
`;

export const Banner = (props: Props) => {
  const {
    data: { prices, tokenSupply, staking },
  } = props;

  const supplyIncrease = getSupplyIncrease(tokenSupply.bac, prices.bacTwap);
  const returnPerBas = getReturnPerBas(
    tokenSupply.bac,
    prices.bacTwap,
    staking.basBoardroom,
  );
  const basReturnDaily = getBasReturnDaily(prices.bacSpot, returnPerBas, prices.basSpot);

  return (
    <Container>
      <Content>
        <NextEpoch>{'Next Epoch:'}</NextEpoch>
        {supplyIncrease > 0 && (
          <>
            <Supply>{`The supply will be increased by ${formatValue(
              supplyIncrease,
            )} BAC.`}</Supply>

            <Return>{`Returning ${formatValue(returnPerBas)} BAC (${formatValue(
              basReturnDaily * 100,
            )}% Daily & ${formatValue(
              basReturnDaily * DAYS_IN_YEAR * 100,
            )}% APY) per BAS.`}</Return>
          </>
        )}
        {supplyIncrease < 0 && (
          <Supply>{`There will be no supply increase based on the current BAC TWAP price of $${prices.bacTwap}.`}</Supply>
        )}
      </Content>
    </Container>
  );
};
