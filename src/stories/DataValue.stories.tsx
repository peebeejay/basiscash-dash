import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { DataValue } from '../components/DataValue';

export default {
  title: 'DataValue',
};

const Container = styled.div`
  width: 14vw;
  margin: ${rem(15)};
`;

export const dataValue = () => {
  return (
    <Container>
      <DataValue text="BAC Spot Price" />
    </Container>
  );
};
