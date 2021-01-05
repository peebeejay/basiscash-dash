import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import {
  getSupplyIncrease,
  getReturnPerBas,
  getBasReturnDaily,
  formatNumber,
} from '../utils';
import { Data } from './DashboardProvider/state';
import { DAYS_IN_YEAR, INFLATION_THRESHOLD_PRICE } from '../constants';

type Props = {
  data: Data;
};

const Container = styled.section`
  text-align: left;
  transition: 250ms background-color ease;
  background-color: ${({ theme }) => theme.bannerColor};
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: ${rem(10)};
  padding: ${rem(40)};

  @media (max-width: ${rem(800)}) {
    padding: ${rem(20)};
  }
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

  @media (max-width: ${rem(800)}) {
    font-size: ${rem(16)};
  }
`;

const Supply = styled.div`
  font-size: ${rem(22)};
  font-weight: 600;
  line-height: ${rem(30)};
  margin-bottom: ${rem(5)};

  @media (max-width: ${rem(800)}) {
    font-size: ${rem(18)};
    line-height: ${rem(24)};
    margin-bottom: ${rem(10)};
  }
`;

const Return = styled.div`
  font-size: ${rem(18)};
  font-weight: 500;
  line-height: ${rem(22)};

  @media (max-width: ${rem(800)}) {
    font-size: ${rem(16)};
  }
`;

export const Banner = (props: Props) => {
  const {
    data: { prices, tokenSupply, staking },
  } = props;
  /* BAC Supply increase without taking BAB into account */
  const grossSupplyIncrease = getSupplyIncrease(tokenSupply.bac, prices.bacTwap);
  /* BAC Supply increase min BAC delegated to BAB holders */
  const netSupplyIncrease = grossSupplyIncrease - tokenSupply.bab;

  const returnPerBas = getReturnPerBas(netSupplyIncrease, staking.basBoardroom);
  const basReturnDaily = getBasReturnDaily(prices.bacSpot, returnPerBas, prices.basSpot);

  const willExpand = prices.bacTwap >= INFLATION_THRESHOLD_PRICE;
  const willDeflate = prices.babSpot < 1.0;

  return (
    <Container>
      <Content>
        <NextEpoch>{'Next Epoch:'}</NextEpoch>
        {willExpand && (
          <>
            <Supply>{`The supply will be increased by ${formatNumber(
              grossSupplyIncrease,
              0,
            )} BAC.`}</Supply>

            {netSupplyIncrease > 0 && (
              <Return>
                {`Returning ${formatNumber(returnPerBas)} BAC (${formatNumber(
                  basReturnDaily * 100,
                )}% Daily & ${formatNumber(
                  basReturnDaily * DAYS_IN_YEAR * 100,
                  0,
                )}% APY) per BAS`}
              </Return>
            )}

            {netSupplyIncrease <= 0 && (
              <Return>
                {`All newly issued BAC will be delegated to BAB holders. Network debt will be reduced by ${formatNumber(
                  (grossSupplyIncrease / tokenSupply.bab) * 100,
                  1,
                )}%.`}
              </Return>
            )}
          </>
        )}
        {!willExpand && (
          <Supply>{`There is expected to be no supply increase based on the current BAC TWAP of $${prices.bacTwap} DAI.`}</Supply>
        )}
        {willDeflate && (
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
