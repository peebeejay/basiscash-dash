import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Data } from './DashboardProvider/state';
import { commify } from 'ethers/lib/utils';
import { formatNumber } from '../utils';
import { LargeHeader } from './typography/LargeHeader';
import { ListItem, Name, Value } from './typography/ListItem';
import { RightContainer, LeftContainer, RowContainer } from './typography/Section';
import { SentimentColor } from './typography/SentimentColor';

type Props = {
  data: Data;
};

const SupplyContainer = styled(LeftContainer)`
  @media (max-width: ${rem(800)}) {
    margin: 0 ${rem(20)};
  }
`;

const PriceContainer = styled(RightContainer)`
  @media (max-width: ${rem(800)}) {
    margin: 0 ${rem(20)};
  }
`;

export const PriceAndSupply = (props: Props) => {
  const {
    data: { tokenSupply, prices },
  } = props;

  return (
    <RowContainer>
      <SupplyContainer>
        <LargeHeader>{'Supply'}</LargeHeader>
        <ListItem>
          <Name>{'BAS Circ Supply:'}</Name>
          <Value>{commify(tokenSupply.basCirculating)}</Value>
        </ListItem>
        <ListItem>
          <Name>{'BAB Supply:'}</Name>
          <Value>{commify(tokenSupply.bab)}</Value>
        </ListItem>
      </SupplyContainer>

      <PriceContainer>
        <LargeHeader>{'Price'}</LargeHeader>
        <ListItem>
          <Name>{'BAS Price:'}</Name>
          <SentimentColor value={prices.basSpot}>{`$${formatNumber(
            prices.basSpot,
          )} DAI`}</SentimentColor>
        </ListItem>
        <ListItem>
          <Name>{'BAB Price:'}</Name>
          <SentimentColor value={prices.babSpot}>{`$${formatNumber(
            prices.babSpot,
            3,
          )} DAI`}</SentimentColor>
        </ListItem>
      </PriceContainer>
    </RowContainer>
  );
};
