import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Data } from './DashboardProvider/state';
import { commify } from 'ethers/lib/utils';
import { formatNumber } from '../utils';
import { LargeHeader } from './typography/LargeHeader';
import { ListItem, Name, Value } from './typography/ListItem';

type Props = {
  data: Data;
};

const RowContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${rem(10)};
  flex: 1;
`;

const SupplyContainer = styled(SectionContainer)`
  margin-right: ${rem(30)};
`;

const PriceContainer = styled(SectionContainer)`
  margin-left: ${rem(30)};
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
          <Value>{`$${formatNumber(prices.basSpot)} DAI`}</Value>
        </ListItem>
        <ListItem>
          <Name>{'BAB Price:'}</Name>
          <Value>{`$${formatNumber(prices.babSpot)} DAI`}</Value>
        </ListItem>
      </PriceContainer>
    </RowContainer>
  );
};
