import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import {
  getSupplyIncrease,
  getReturnPerBas,
  getBasReturnDaily,
  formatValue,
  formatNumber,
} from '../utils';
import { Data } from './DashboardProvider/state';
import {
  DAYS_IN_YEAR,
  DEFLATION_THRESHOLD_PRICE,
  INFLATION_THRESHOLD_PRICE,
} from '../constants';

type Props = {
  data: Data;
};

const Container = styled.section`
  text-align: left;
  background-color: ${({ theme }) => theme.bannerColor};
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: ${rem(10)};
  padding: ${rem(40)};
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
  const willExpand = prices.bacTwap > INFLATION_THRESHOLD_PRICE;
  const willDeflate = prices.bacTwap < DEFLATION_THRESHOLD_PRICE;

  return (
    <Container>
      <Content>
        <NextEpoch>{'Next Epoch:'}</NextEpoch>
        {willExpand && (
          <>
            <Supply>{`The supply will be increased by ${formatValue(
              supplyIncrease,
            )} BAC.`}</Supply>

            <Return>
              {`Returning ${formatValue(returnPerBas)} BAC (${formatValue(
                basReturnDaily * 100,
              )}% Daily & ${formatValue(
                basReturnDaily * DAYS_IN_YEAR * 100,
              )}% APY) per BAS.`}
            </Return>
          </>
        )}
        {!willExpand && (
          <Supply>{`There is expected to be no supply increase based on the current BAC TWAP price of $${prices.bacTwap} DAI.`}</Supply>
        )}
        {prices.babSpot < 1.0 && (
          <Return>
            {`Basis Bonds (BAB) can be purchased for $${formatNumber(
              prices.babSpot,
            )} DAI to deflate BAC supply.`}
          </Return>
        )}
      </Content>
    </Container>
  );
};
