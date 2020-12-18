import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { DataHeader } from '../components/DataHeader';

export default {
  title: 'DataHeader',
};

const Container = styled.div`
  width: 14vw;
  margin: ${rem(15)};
`;

export const dataHeader = () => {
  return (
    <Container>
      <DataHeader text="BAC Spot Price" />
    </Container>
  );
};
